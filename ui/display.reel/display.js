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
            this.parent = this.element.querySelector(".content .numbers");
            this.loading = true;
            stream.listen(function (data) {
                this.append(data);
                this.loading = false;
            }.bind(this));
        }
    },

    loading: {
        get: function () {
            return Boolean(this._loading);
        },

        set: function (loading) {
            if (loading && !this._loading) {
                this._loading = document.createElement("div");
                this._loading.textContent = "loading...";
                this.parent.appendChild(this._loading);
                this.scroll();
            } else if (!loading && this._loading) {
                this._loading = null;
            }
        }
    },

    append: {
        value: function (text) {
            var child = this.parent.lastChild;
            child.textContent = this.loading ? text : (child.textContent + ", " + text);
        }
    },

    scroll: {
        value: function () {
            var maxHeight = this.element.offsetHeight;
            while (this.parent.offsetHeight > maxHeight && this.parent.childNodes.length) {
                this.parent.removeChild(this.parent.childNodes[0]);
            }
        }
    }
});
