/**
 * @module ui/display.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Display
 * @extends Component
 */
exports.Display = Component.specialize(/** @lends Display# */ {
    constructor: {
        value: function Display() {
            this.super();
        }
    },

    display: {
        value: function (stream) {
            // TODO.
        }
    }
});
