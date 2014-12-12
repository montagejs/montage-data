/**
 * @module ui/controls.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var NumberSelector = require("logic/number-selector").NumberSelector;

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

    handleUpdateAction: {
        value: function (event) {
            var language = this.templateObjects.language.value.code;
            this.dispatchEvent(new CustomEvent("update", {
                detail: {selector: new NumberSelector(language)},
                bubbles: true,
                cancelable: true
            }));
        }
    }
});
