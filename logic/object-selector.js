/**
 * @module logic/object-selector.js
 *
 * This code is temporarily in the Contour project but meant to eventually be
 * part of the Montage-Data project.
 */
var Montage = require("montage").Montage;

/**
 * @class ObjectSelector
 * @extends Montage
 */
exports.ObjectSelector = Montage.specialize(/** @lends ObjectSelector.prototype */ {
    constructor: {
        value: function ObjectSelector(type) {
            this.super();
            this.type = type;
        }
    }
});
