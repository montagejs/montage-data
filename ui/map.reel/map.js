/**
 * @module ui/map.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Map
 * @extends Component
 */
exports.Map = Component.specialize(/** @lends Map# */ {
    constructor: {
        value: function Map() {
            this.super();
        }
    },

    update: {
        value: function (stream) {
            this.templateObjects[stream.selector.type + "Layer"].update(stream);
        }
    }
});
