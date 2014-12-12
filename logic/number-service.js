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
        }
    },

    numbers: {
        value: {
            EN: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
            ES: ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"],
            FR: ["zero", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"]
        }
    },

    query: {
        value: function (selector) {
            this.stream = new NumberStream(selector);
            if (this.number) {
                window.setTimeout(this.feed.bind(this, this.stream), 250);
            }
            return this.stream;
        }
    },

    stream: {
        get: function() {
            return this._stream;
        },

        set: function(stream) {
            if (this._stream && !this._stream.settled) {
                this._stream.resolve();  // TODO: Pass in an appropriate value.
            }
            this._stream = stream;
        }
    },

    number: {
        get: function() {
            var language = this.stream && this.stream.selector.language;
            var numbers = language && this.numbers[language];
            var index = numbers && this.stream.index;
            var number = numbers && index < numbers.length && numbers[index];
            if (!number && numbers && index < numbers.length) {
                this.stream.reject();  // TODO: Pass in an appropriate error.
            } else if (!number) {
                this.stream.resolve();  // TODO: Pass in an appropriate value.
            }
            return number;
        }
    },

    feed: {
        value: function (stream) {
            var number = (stream == this.stream) && this.number;
            if (number) {
                this.stream.add(number);
                this.stream.index += 1;
                window.setTimeout(this.feed.bind(this, this.stream), 250);
            }
        }
    }
});
