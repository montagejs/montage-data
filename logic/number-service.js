/**
 * @module logic/number-service.js
 */
var NumberStream = require("logic/number-stream").NumberStream;
var ObjectService = require("logic/object-service").ObjectService;

/**
 * @class NumberService
 * @extends ObjectService
 */
exports.NumberService = ObjectService.specialize(/** @lends NumberService.prototype */ {
    constructor: {
        value: function NumberService() {
            this.super();
            this.stream = null;
        }
    },

    query: {
        value: function (selector) {
            // TODO: Fulfill the current stream promise.
            this.stream = new NumberStream();
            window.setTimeout(next, 1000);
        }
    },

    next: {
        value: function () {
            this.stream.number += 1;
            this.stream.add(this.string(this.stream.number));
            window.setTimeout(next, 1000);
        }
    },

    string: {
        value: function (number) {
            // TODO: Return the number in the appropriate language.
            return number;
        }
    }
});
