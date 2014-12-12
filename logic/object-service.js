/**
 * @module logic/object-service.js
 *
 * This code is temporarily in the Contour project but meant to eventually be
 * part of the Montage-Data project.
 */
var Montage = require("montage").Montage;
var NumberService = require("logic/number-service").NumberService;
var NumberStream = require("logic/number-stream").NumberStream;

/**
 * @class ObjectService
 * @extends Montage
 */
exports.ObjectService = Montage.specialize(/** @lends ObjectService.prototype */ {
    constructor: {
        value: function ObjectService() {
            this.super();
            // Hard-coded here for now, the child services of this object
            // service should be generated from a blueprint.
            this.numberService = new NumberService();
        }
    },

    query:  {
        value: function (selector) {
            // Hard-coded here for now, the mapping between selector and
            // responding child service should be generated from a blueprint.
            return this.numberService.query(selector);
        }
    }
});
