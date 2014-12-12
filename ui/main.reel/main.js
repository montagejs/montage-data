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

    handleGo: {
        value: function () {
            var selector = this.templateObjects.controls.selector;
            var stream = this.service.query(selector);
            this.templateObjects.display.display(stream);
        }
    }
});
