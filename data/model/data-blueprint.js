/**
 @module montage/data/blueprint
 @requires montage/core/core
 @requires montage/data/store
 @requires montage/data/object-id
 @requires data/query
 @requires core/exception
 @requires data/object-property
 @requires core/promise
 @requires core/logger
 */
var Montage = require("montage").Montage;
var Blueprint = require("montage/core/meta/blueprint").Blueprint;
var DataPropertyBlueprint = require("data/model/data-property-blueprint").DataPropertyBlueprint;
var DataAssociationBlueprint = require("data/model/data-association-blueprint").DataAssociationBlueprint;
var MappingSet = require("data/model/mapping").MappingSet;
var TemporaryObjectId = require("data/object-id").TemporaryObjectId;
var Query = require("data/query").Query;
var DataObjectProperty = require("data/model/data-object-property").DataObjectProperty;
var Promise = require("montage/core/promise").Promise;
var Exception = require("montage/core/exception").Exception;
var logger = require("montage/core/logger").logger("blueprint");

/**
 @class module:montage/data/bluprint.Blueprint
 */
var DataBlueprint = exports.DataBlueprint = Blueprint.specialize(/** @lends module:montage/data/bluprint.Blueprint# */ {

    constructor: {
        value: function DataBlueprint() {
            this.super();
            this._mappingForName = {};
            this._mappings = [];
        }
    },

    serializeSelf: {
        value: function (serializer) {
            this.super(serializer);
            serializer.setProperty("mappings", this._mappings);
        }
    },

    deserializeSelf: {
        value: function (deserializer) {
            this.super(deserializer);
            this._mappings.push.apply(this._mappings, deserializer.getProperty("mappings"));
            var aMapping, index;
            for (index = 0; typeof (aMapping = this._mappings[index]) !== "undefined"; index++) {
                this._mappingForName[aMapping.name] = aMapping;
            }
        }
    },

    /*
     * Enable subclasses to overwrite the blueprint class
     */
    propertyBlueprintConstructor: {
        value: DataPropertyBlueprint
    },

    /*
     * Enable subclasses to overwrite the blueprint class
     */
    associationBlueprintConstructor: {
        value: DataAssociationBlueprint
    },

    /**
     @private
     */
    _mappings: {
        value: null
    },

    /**
     @private
     */
    _mappingForName: {
        value: null
    },

    /**
     List of mappings attached to this object.
     @function
     @returns mappings
     */
    mappings: {
        get: function () {
            return this._mappings;
        }
    },

    /**
     Add a mapping to the list of mappings.
     @function
     @param {mapping} mapping to add.
     @returns mapping
     */
    addMapping: {
        value: function (mapping) {
            if (mapping !== null) {
                var index = this.mappings.indexOf(mapping);
                if (index < 0) {
                    if (mapping.owner !== this) {
                        throw new Error(
                            "Mapping already owned: " + JSON.stringify(mapping));
                    }
                    this.mappings.push(mapping);
                    //
                    this._mappingForName[mapping.name] = mapping;
                }
            }
            return mapping;
        }
    },

    /**
     Remove a mapping to the list of mappings.
     @function
     @param {mapping} mapping to remove.
     @returns mapping
     */
    removeMapping: {
        value: function (mapping) {
            if (mapping !== null) {
                var index = this.mappings.indexOf(mapping);
                if (index >= 0) {
                    this.mappings.splice(index, 1);
                    // Remove the cached entry
                    delete this._mappingForName[mapping.name];
                }
            }
            return mapping;
        }
    },

    /**
     Retrieve a mapping from the list of mappings.<br/>
     @function
     @param {name} name of the mapping to retrieve.
     @returns mapping
     */
    mappingForName: {
        value: function (name) {
            return this._mappingForName[name];
        }
    },

    /**
     Create a new mapping.
     @function
     @param {store} store to create the mapping for.
     @param {mapping} parent mapping.
     @param {name} identifier for the new mapping.
     @returns binderMapping
     */
    createMappingForStore: {
        value: function (store, mapping, name) {
            var aMapping = this.mappingForName(name);
            if (!aMapping) {
                aMapping = new store.blueprintMappingConstructor().initWithOwnerAndParent(this, mapping);
                this.addMapping(aMapping);
                var anAttribute, index;
                for (index = 0; typeof (aProperty = this.propertyBlueprints[index]) !== "undefined"; index++) {
                    aProperty.createMappingForStore(store, aMapping, name);
                }
            }
            return aMapping;
        }
    },

    /**
     Delete a mapping for a given store.
     @function
     @param {store} store to delete the mapping for.
     @param {mapping} parent mapping.
     @param {name} identifier for the mapping.
     @returns binderMapping
     */
    deleteMappingForStore: {
        value: function (store, mapping, name) {
            var aMapping = this.mappingForName(name);
            if (aMapping && (aMapping.parent === mapping)) {
                this.removeMapping(aMapping);
                var anAttribute, index;
                for (index = 0; typeof (aProperty = this.propertyBlueprints[index]) !== "undefined"; index++) {
                    aProperty.deleteMappingForStore(store, aMapping, name);
                }
            }
        }
    },

    /**
     Description TODO
     @type  {Property}
     @default {Array} new Array(10)
     */
    queries: {
        value: new Array(10),
        serializable: true,
        distinct: true,
        writable: false
    },

    /**
     Description TODO
     @private
     */
    _queriesTable: {
        value: {},
        serializable: false,
        distinct: true,
        enumerable: false,
        writable: false
    },

    /**
     Description TODO
     @type {Property}
     @default {Table} {}
     */
    restrictionsTable: {
        value: {},
        serializable: true,
        distinct: true,
        enumerable: false,
        writable: false
    },

    /**
     Description TODO
     @function
     @param {String} query TODO
     @returns query
     */
    addQuery: {
        value: function (query) {
            if (query !== null && query.name != null) {
                if (query.blueprint !== this) {
                    throw Exception.create().initWithMessageTargetAndMethod("Query not associated with this blueprint", this, query.name);
                }
                var index = this.queries.indexOf(query);
                if (index < 0) {
                    this.queries.push(query);
                    this._queriesTable[query.name] = query;
                }
            }
            return query;
        }
    },
    /**
     Description TODO
     @function
     @param {String} query TODO
     @returns query
     */
    removeQuery: {
        value: function (query) {
            if (query !== null && query.name != null) {
                if (query.blueprint !== this) {
                    throw Exception.create().initWithMessageTargetAndMethod("Query not associated with this blueprint", this, query.name);
                }
                var index = this.queries.indexOf(query);
                if (index >= 0) {
                    this.queries.splice(index, 1);
                    delete this._queriesTable[query.name];
                }
            }
            return query;
        }
    },
    /**
     Description TODO
     @function
     @param {String} name TODO
     @returns query
     */
    queryForName: {
        value: function (name) {
            var query = this._queriesTable[name];
            if (typeof query === "undefined") {
                query = UnknownQuery;
                var aQuery, index;
                for (index = 0; typeof (aQuery = this.queries[index]) !== "undefined"; index++) {
                    if (query.name === name) {
                        query = aQuery;
                        break;
                    }
                }
                this._queriesTable[name] = query;
            }
            if (query === UnknownQuery) {
                query = null;
            }
            return query;
        }
    },
    /**
     Description TODO
     @function
     @param {String} name TODO
     @param {Selector} selector TODO
     @returns restriction
     */
    addRestriction: {
        value: function (name, selector) {
            var restriction = null;
            if (name != null && selector != null) {
                restriction = this.restrictionsTable[name] = selector;
            }
            return restriction;
        }
    },
    /**
     Description TODO
     @function
     @param {String} name TODO
     @returns restriction
     */
    removeRestriction: {
        value: function (name) {
            if (name !== null) {
                var restriction = this.restrictionsTable[name]
                if (restriction != null) {
                    delete restriction;
                }
            }
            return restriction;
        }
    },

    /**
     Return the selector for this restriction.<br>
     <b>Note:</b> This selector is usually parametric.<br>
     Parameters need to be resolved before it can be evaluated.
     @function
     @param {String} restriction TODO
     @returns selector
     */
    selectorForRestriction: {
        value: function (restriction) {
            var selector = null;
            if (restriction != null) {
                selector = this.restrictionsTable[restriction.name];
                if (typeof selector === 'undefined') {
                    selector = null;
                }
                if ((selector == null) && (this.binder !== null)) {
                    selector = this.binder.defaultSelectorForRestriction(restriction);
                }
            }
            return selector;
        }
    },

    /**
     This is the get function called on the target object to access properties.<br>
     On call this refers to the target object.
     @function
     @param {Object} propertyName TODO
     @returns {Array} [storageKey]
     */
    blueprintGet: {
        value: function (propertyName) {
            var attribute = this.blueprint.attributeForName(propertyName);
            var storageKey = "_" + attribute.name;
            this.willRead(attribute);
            return this[storageKey];
        },
        enumerable: false,
        serializable: false
    },
    /**
     This is the get function called on the target object to set properties.<br>
     On call this refers to the target object.
     @function
     @param {Object} propertyName TODO
     @param {Property} value TODO
     @returns {Array} [storageKey]
     */
    blueprintSet: {
        value: function (propertyName, value) {
            var attribute = this.blueprint.attributeForName(propertyName);
            var storageKey = "_" + attribute.name;
            if (value == null && attribute.denyDelete) {
                throw Exception.create().initWithMessageTargetAndMethod("Deny Delete", this, attribute.name);
            } else {
                this.willModify(attribute, value);
                this[storageKey] = value;
            }
        },
        enumerable: false,
        serializable: false
    },
    /**
     Returns tne new value for the temporary object ID.<br>
     This can be overwritten by subclass.
     @function
     @returns TemporaryObjectId
     */
    objectId$Implementation: {
        get: function () {
            return TemporaryObjectId.create().initWithBlueprint(this);
        }
    },
    /**
     Description TODO
     @function
     @returns Query.create().initWithBlueprint(this)
     */
    query: {
        value: function () {
            return Query.create().initWithBlueprint(this);
        }
    }

});
var UnknownBlueprint = Object.freeze(Blueprint.create().initWithName("Unknown"));
var UnknownQuery = Object.freeze(Query.create().initWithBlueprint(null));