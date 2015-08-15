/**
 @module montage/data/object-id
 @requires montage/core/core
 @requires montage/core/uuid
 @requires montage/core/logger
 */
var Montage = require("montage").Montage;
var Uuid = require("montage/core/uuid").Uuid;
var logger = require("montage/core/logger").logger("objectId");
/**
 @class module:montage/data/object-id.ObjectId
 @extends module:montage/core/core.Montage
 */
var ObjectId = exports.ObjectId = Montage.specialize(/** @lends module:montage/data/object-id.ObjectId# */ {

    constructor: {
        value: function ObjectId() {
            this.super();
        }
    },

    /**
     Description TODO
     @type {Property}
     @default {Boolean} false
     */
    isTemporary: {
        get: function () {
            return false;
        }
    },

    /**
     Description TODO
     @type {Property}
     @default {Object} null
     */
    _blueprint: {
        serializable: true,
        enumerable: false,
        value: null
    },

    /**
     Description TODO
     @type {Property}
     @default {Object} null
     */
    blueprint: {
        get: function () {
            return this._blueprint;
        }
    }

});
/**
 @class module:montage/data/object-id.TemporaryObjectId
 */
var TemporaryObjectId = exports.TemporaryObjectId = ObjectId.specialize(/** @lends module:montage/data/object-id.TemporaryObjectId# */ {

    constructor: {
        value: function TemporaryObjectId() {
            this.super();
        }
    },

    /**
     Description TODO
     @type {Property}
     @default {Boolean} true
     */
    isTemporary: {
        get: function () {
            return true;
        }
    },
    /**
     Description TODO
     @private
     */
    _uuid: {
        serializable: true,
        enumerable: false,
        value: null
    },
    /**
     Description TODO
     @function
     @returns itself
     */
    initWithBlueprint: {
        serializable: false,
        enumerable: false,
        value: function (blueprint) {
            this._blueprint = blueprint;
            this._uuid = Uuid.generate();
            if (logger.isDebug) {
                logger.debug(this, "New Temporary Object ID: " + this._uuid);
            }
            Object.freeze(this);
            return this;
        }
    }

});
