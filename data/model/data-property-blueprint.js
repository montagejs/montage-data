var Montage = require("montage").Montage;
var PropertyBlueprint = require("montage/core/meta/property-blueprint").PropertyBlueprint;
var logger = require("montage/core/logger").logger("data-property-blueprint");


/**
 @class module:montage/data/data-property-blueprint.DataPropertyBlueprint
 */
var DataPropertyBlueprint = exports.DataPropertyBlueprint = PropertyBlueprint.specialize(/** @lends module:montage/data/blueprint.Attribute# */ {

    constructor: {
        value: function DataPropertyBlueprint() {
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
     @param {mapping} parent mapping.
     @param {name} identifier for the new mapping.
     @returns binderMapping
     */
    createMappingForStore: {
        value: function (store, mapping, name) {
            var aMapping = this.mappingForName(name);
            if (!aMapping) {
                aMapping = new store.attributeMappingConstructor().initWithOwnerAndParent(this, mapping);
                this.addMapping(aMapping);
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
            if (aMapping) {
                this.removeMapping(aMapping);
            }
        }
    }

});
