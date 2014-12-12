/**
 * @module logic/object-service.js
 *
 * This code is temporarily in the Contour project but meant to eventually be
 * part of the Montage-Data project.
 */
var Montage = require("montage").Montage;

/**
 * @class ObjectService
 * @extends Montage
 */
exports.ObjectService = Montage.specialize(/** @lends ObjectService.prototype */ {
    constructor: {
        value: function ObjectService() {
            this.super();
        }
    },

    query:  {
        value: function (selector) {
            // The mapping between the selector received and which child service
            // will handle it is hard coded to numberService for now, but it
            // should be generated from a blueprint in the future.
            return this.numberService.query(selector);
        }
    },

    // The numberService child service of this object service is hard-coded here
    // for now, but it should be generated from a blueprint in the future.
    numberService: {
        get: function () {
            if (!this._numberService) {
                this._numberService = new (this.NumberService)();
            }
            return this._numberService;
        }
    },

    // The NumberService constructor must be obtained lazilly here rather than
    // required at the top of this file because it's a child of ObjectService
    // and so can't be created until ObjectService is defined above.
    NumberService: {
        get: function () {
            if (!this._NumberService) {
                this._NumberService = require("logic/number-service").NumberService;
            }
            return this._NumberService;
        }
    }
});
