/**
 * @module logic/number-selector.js
 */
var ObjectSelector = require("logic/object-selector").ObjectSelector;

/**
 * @class NumberSelector
 * @extends ObjectSelector
 */
exports.NumberSelector = ObjectSelector.specialize(/** @lends NumberSelector.prototype */ {
    constructor: {
        value: function NumberSelector(language) {
            this.super("number");
            this.language = language || "EN";
        }
    }

    // TODO: Provide a setter for this.language to validate set values.
});
