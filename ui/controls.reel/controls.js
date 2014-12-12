/**
 * @module ui/controls.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Controls
 * @extends Component
 */
exports.Controls = Component.specialize(/** @lends Controls# */ {
    constructor: {
        value: function Controls() {
            this.super();
            // TODO: Register handleGo().
        }
    },

    handleGo: {
        value: function () {
            var language = this.templateObjects.language;
            this.selector = new NumberSelector(language.value);
            // TODO: Trigger event in parent.
        }
    }
});
