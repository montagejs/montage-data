/**
 * @module logic/number-stream.js
 */
var ObjectStream = require("logic/object-stream").ObjectStream;

/**
 * @class NumberStream
 * @extends ObjectStream
 */
exports.NumberStream = ObjectStream.specialize(/** @lends NumberStream.prototype */ {
    constructor: {
        value: function NumberStream(selector) {
            this.super(selector);
            this.index = 0;
        }
    }
});
