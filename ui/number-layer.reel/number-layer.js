/**
 * @module ui/number-layer.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class NumberLayer
 * @extends Component
 */
exports.NumberLayer = Component.specialize(/** @lends NumberLayer# */ {
    constructor: {
        value: function NumberLayer() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function (stream) {
            this.lines = this.element.querySelector(".lines");
        }
    },

    update: {
        value: function (stream) {
            var line = this.appendLine("Loading...");
            var loading = true;
            stream.listen(function (data) {
                line.textContent = loading ? data : (line.textContent + ", " + data);
                loading = false;
            });
        }
    },

    appendLine: {
        value: function (text) {
            var line = document.createElement("div");
            line.textContent = "loading...";
            this.scrollForLine(line);
            return this.element.querySelector(".lines").appendChild(line);
        }
    },

    scrollForLine: {
        value: function (line) {
            var lines = this.element.querySelector(".lines")
            var height = this.element.offsetHeight - line.offsetHeight;
            while (lines.offsetHeight > height && lines.childNodes.length) {
                lines.removeChild(lines.childNodes[0]);
            }
        }
    }
});
