/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var ObjectService = require("logic/object-service").ObjectService;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
            this.service = new ObjectService();
            // TODO: Register handleGo().
        }
    },

    handleControlsUpdate: {
        value: function (event) {
            var stream = this.service.query(event.detail.selector);
            this.templateObjects.display.display(stream);
        }
    }
});
