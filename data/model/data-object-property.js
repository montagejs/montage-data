/**
 @module montage/data/object-property
 @requires montage/data/pledge
 @requires montage/core/core
 @requires montage/core/exception
 @requires montage/core/logger
 */
var Montage = require("montage").Montage;
var ObjectProperty = require("montage/core/meta/object-property").ObjectProperty;
var Exception = require("montage/core/exception").Exception;
var Pledge = require("data/pledge").Pledge;
var PledgedSortedSet = require("data/pledge").PledgedSortedSet;
var Store = require("data/pledge").Store;
var logger = require("montage/core/logger").logger("object-property");
/**
 Description TODO
 @private
 */
var _objectPropertyManager = null;
/**
 @class module:montage/data/object-property.ObjectProperty
 @extends module:montage/core/core.Montage
 */
var DataObjectProperty = exports.DataObjectProperty = ObjectProperty.specialize(/** @lends module:montage/data/object-property.ObjectProperty# */ {

    constructor: {
        value: function DataObjectProperty() {
            this.super();
        }
    },

    /**
     Add all the properties defined in the blueprint to the target prototype.
     @function
     @param {Property} prototype TODO
     @param {Object} blueprint TODO
     */
    addProperties: {
        value: function (prototype, blueprint) {
            this.super(prototype, blueprint);

            Montage.defineProperty(prototype, "context", { serializable: false, enumerable: true, value: null });
            Montage.defineProperty(prototype, "_objectId", { serializable: true, enumerable: false, value: null });
            Montage.defineProperty(prototype, "objectId", {
                enumerable: true,
                serializable: false,
                get: function () {
                    if (this._objectId === null) {
                        this._objectId = this.blueprint.objectId$Implementation;
                    }
                    return this._objectId;
                },
                set: function (value) {
                    if (value !== null) {
                        this._objectId = value;
                    } else {
                        throw Exception.create().initWithMessageTargetAndMethod("Cannot set object Id to null", this, "objectId.set");
                    }
                }
            });
            Montage.defineProperty(prototype, "isPledge", { serializable: false, enumerable: true, value: false });
            Montage.defineProperty(prototype, "withProperties", { serializable: false, enumerable: false, value: function () {
                return null;
            }});
            Montage.defineProperty(prototype, "willRead", { serializable: false, enumerable: false, value: this.willRead });
            Montage.defineProperty(prototype, "willModify", { serializable: false, enumerable: false, value: this.willModify });
            // Provide a storage property for any state the access layer need to store in teh object. This would typically be a database snapshot reference.
            Montage.defineProperty(prototype, "_opaqueAccessState", { serializable: false, enumerable: false, value: null});
        }
    },

    /**
     This is the get function called on the target object to access properties.<br>
     @function
     @param {Object} propertyName TODO
     @returns {Array} [storageKey]
     */
    blueprintGet: {
        value: function (propertyName) {
            var propertyBlueprint = this.blueprint.propertyBlueprintForName(propertyName);
            var storageKey = "_" + propertyBlueprint.name;
            this.willRead(propertyBlueprint);
            return this[storageKey];
        },
        enumerable: false,
        serializable: false
    },

    /**
     This is the get function called on the target object to set properties.<br>
     @function
     @param {Object} propertyName TODO
     @param {Property} value TODO
     @returns {Array} [storageKey]
     */
    blueprintSet: {
        value: function (propertyName, value) {
            var propertyBlueprint = this.blueprint.propertyBlueprintForName(propertyName);
            var storageKey = "_" + propertyBlueprint.name;
            if (value == null && propertyBlueprint.denyDelete) {
                throw Exception.create().initWithMessageTargetAndMethod("Deny Delete", this, propertyBlueprint.name);
            } else {
                this.willModify(propertyBlueprint, value);
                this[storageKey] = value;
            }
        },
        enumerable: false,
        serializable: false
    },

    /**
     Description TODO
     @function
     @param {Object} attribute TODO
     */
    willRead: {
        value: function (attribute) {
            var storageKey = "_" + attribute.name;
            if (typeof this[storageKey] !== 'undefined') {
                // the property is already resolved nothing to do.
                return;
            }
            if ((typeof this.context !== 'undefined') && (this.context !== null)) {
                this.context.fulfillPropertyForInstance(attribute, this);
            }
        }
    },
    /**
     Description TODO
     @function
     @param {Object} attribute TODO
     @param {Property} value TODO
     */
    willModify: {
        value: function (attribute, value) {
            var storageKey = "_" + attribute.name;
            var previousValue = this[storageKey];
            if ((typeof previousValue === 'undefined') || (previousValue !== value)) {
                // XXX value.addEventListener("change", this._onObjectsChange, false);
                //
                if ((typeof this.context !== 'undefined') && (this.context !== null)) {
                    this.context.willModifyPropertyForInstance(attribute, this, value);
                }
            }
        }
    },

});
