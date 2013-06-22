/**
	@module montage/data/control-listener
    @requires montage/core/core
    @requires montage/core/logger
*/
var Montage = require("montage").Montage;
var logger = require("montage/core/logger").logger("controlListener");
/**
    @class module:montage/data/control-listener.ControlListener
    @extends module:montage/core/core.Montage
*/
var ControlListener = exports.ControlListener = Montage.specialize(/** @lends module:montage/data/control-listener.ControlListener# */ {

    constructor: {
        value: function ControlListener() {
            this.super();
        }
    },

    /**
    Description TODO
    @function
    @param {Property} delegate TODO
    @param {Property} key TODO
    @param {Property} identifier TODO
    @returns null
    */
    callbackForKey: {
        value: function(delegate, key, identifier) {
            if (typeof delegate !== "function") {
                return delegate;
            }
            if ((typeof delegate !== "object") || (typeof key !== "string")) {
                return null;
            }
            if (identifier) {
                var newKey = identifier + key.toCapitalized();
                if (typeof delegate[newKey] === "function") {
                    return delegate[newKey];
                }
            }
            if (typeof delegate[key] === "function") {
                return delegate[key];
            }
            return null;
        }
    }

});
