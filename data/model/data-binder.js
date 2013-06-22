/**
 @module montage/data/blueprint
 @requires montage/core/core
 @requires montage/data/store
 @requires montage/data/object-id
 @requires data/query
 @requires data/object-property
 @requires core/promise
 @requires core/logger
 */
var Montage = require("montage").Montage;
var DataBlueprint = require("data/model/data-blueprint").DataBlueprint;
var Binder = require("montage/core/meta/binder").Binder;
var MappingSet = require("data/model/mapping").MappingSet;
var DataObjectProperty = require("data/model/data-object-property").DataObjectProperty;
var logger = require("montage/core/logger").logger("blueprint");

/**
 @class module:montage/data/blueprint.Binder
 @classdesc A blueprint binder is a collection of of blueprints for a specific access type. It also includes the connection information.
 @extends module:montage/core/core.Montage
 */
var DataBinder = exports.DataBinder = Binder.specialize(/** @lends module:montage/data/blueprint.Binder# */ {

    constructor: {
        value: function DataBinder() {
            this.super();
            this._mappingForName = {};
            this._mappings = [];
            this._restrictionsTable = {};
            this._blueprintObjectProperty = new DataObjectProperty().init();
        }
    },

    serializeSelf: {
        value: function (serializer) {
            this.super(serializer);
            serializer.setProperty("mappings", this._mappings);
            serializer.setProperty("restrictions", this.restrictionsTable);
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
            var value = deserializer.getProperty("restrictions");
            if (value) {
                this._restrictionsTable = value;
            }
        }
    },

    blueprintConstructor: {
        value: DataBlueprint
    },

    /**
     Description TODO
     @type {Property}
     @default {Table} {}
     */
    _restrictionsTable: {
        value: null
    },

    /**
     Description TODO
     @type {Property}
     @default {Table} {}
     */
    restrictionsTable: {
        get: function() {
            return this._restrictionsTable
        }
    },

    /**
     Description TODO
     @function
     @param {String} name  TODO
     @param {Selector} defaultSelector TODO
     @returns restriction
     */
    addRestriction: {
        value: function (name, defaultSelector) {
            var restriction = null;
            if (name != null && defaultSelector != null) {
                restriction = this.restrictionsTable[name] = defaultSelector;
            }
            return restriction;
        }
    },

    /**
     Description TODO
     @function
     @param {String} name  TODO
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
     Description TODO
     @function
     @param {String} restriction  TODO
     @returns selector
     */
    defaultSelectorForRestriction: {
        value: function (restriction) {
            var selector = null;
            if (restriction != null) {
                selector = this.restrictionsTable[restriction.name];
                if (typeof selector === 'undefined') {
                    selector = null;
                }
            }
            return selector;
        }
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

    // TODO [PJYF June 22 2013] These should be change to make it clear that we are dealing with mapping set and not just mapping

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
     <b>Note:<b/> For Binder objects this function will return an array of mapping: One for each of the store used by the mapping name.
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
     @param {name} identifier for the new mapping.
     @param {recursive} create mapping for all blueprints in this binder.
     @returns binderMapping
     */
    createMappingForStore: {
        value: function (store, name, recursive) {
            var mappingSet = this.mappingForName(name);
            if (!mappingSet) {
                mappingSet = new MappingSet().initWithBinderAndName(this, name);
                this.addMapping(mappingSet);
                if (this._defaultMappingSetName.length == 0) {
                    this._defaultMappingSetName = mappingSet.name;
                }
            }
            var metadata = Montage.getInfoForObject(store);
            var aMapping = mappingSet.mappingForStoreId(metadata.objectName, metadata.moduleId);
            if (!aMapping) {
                aMapping = new store.binderMappingConstructor().initWithOwnerAndParent(this, mappingSet);
                mappingSet.addMapping(aMapping);
            }
            if (recursive || (typeof recursive === "undefined")) {
                var aBlueprint, index;
                for (index = 0; typeof (aBlueprint = this.blueprints[index]) !== "undefined"; index++) {
                    aBlueprint.createMappingForStore(store, aMapping, name);
                }
            }
            return aMapping;
        }
    },

    /**
     Delete a mapping for a given store.
     @function
     @param {store} store to delete the mapping for.
     @param {name} identifier for the mapping.
     @returns binderMapping
     */
    deleteMappingForStore: {
        value: function (store, name) {
            var mappingSet = this.mappingForName(name);
            if (mappingSet) {
                var metadata = Montage.getInfoForObject(store);
                var aMapping = mappingSet.mappingForStoreId(metadata.objectName, metadata.moduleId);
                mappingSet.removeMapping(aMapping);
                var aBlueprint, index;
                for (index = 0; typeof (aBlueprint = this.blueprints[index]) !== "undefined"; index++) {
                    aBlueprint.deleteMappingForStore(store, aMapping, name);
                }
                if (mappingSet.mappings.length == 0) {
                    this.removeMapping(mappingSet);
                    if ((this._defaultMappingSetName.length > 0) && (this._defaultMappingSetName === mappingSet.name)) {
                        if (this.mappings.length > 0) {
                            this._defaultMappingSetName = this.mappings[0].name;
                        } else {
                            this._defaultMappingSetName = "";
                        }
                    }
                }
            }
        }
    },

    _defaultMappingSetName: {
        serializable: true,
        enumerable: false,
        value: ""
    },

    defaultMappingSetName: {
        get: function () {
            if (this._defaultMappingSetName.length == 0) {
                if (this.mappings.length > 0) {
                    this._defaultMappingSetName = this.mappings[0].name;
                }
            }
            return this._defaultMappingSetName;
        },
        set: function (name) {
            this._defaultMappingSetName = name;
        }
    },

    /**
     * Return the blueprint object property for this binder</br>
     * This will return the default if none is declared.
     * @type {Property}
     * @returns {ObjectProperty} default blueprint object property
     */
    objectPropertyInstance: {
        get: function () {
            if (!this._blueprintObjectProperty) {
                this._blueprintObjectProperty = DataObjectProperty.create().init();
            }
            return this._blueprintObjectProperty;
        }
    }

});
