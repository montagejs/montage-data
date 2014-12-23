/**
 * @module ui/leaflet-layer.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class LeafletLayer
 * @extends Component
 */
exports.LeafletLayer = Component.specialize(/** @lends LeafletLayer# */ {
    constructor: {
        value: function LeafletLayer() {
            this.super();
        }
    },

    enterDocument: {
        value: function () {
            var element = this.element.querySelector(".LeafletLayer .map");
            var map = L.map(element).setView([19.553,-172.5],3);
            L.tileLayer('http://{s}.tiles.mapbox.com/v3/gegao0124.kff6be36/{z}/{x}/{y}.png', {
                attribution: 'test',
                maxZoom: 18
            }).addTo(map);
        }
    }
});
