/**
 * @module core/object-service
 */
var Montage = require("montage").Montage;

/**
 * @class ObjectService
 * @augments external:Montage
 * @property {string} type -  An arbitrary string that allows queries to be
 *                            routed to an appropriateObjectService: Queries are
 *                            generally routed to a ObjectService whose type
 *                            matches the query
 *                            {@link module:core/object-selector~ObjectSelector selector}'s
 *                            type.
 * @property {object} token - An arbitrary object that identifies groups of
 *                            queries that are allowed to run at the same time:
 *                            It is changed whenever a new group of queries is
 *                            started, and when that happens queries created
 *                            with previous tokens know that they need to stop.
    * @param type {string} -  Sets the service's type.
 *
 * TODO: Fix JSDoc comments so query() method is commented appropriately.
 */
exports.ObjectService = Montage.specialize({
    constructor: {
        value: function ObjectService(type) {
            this.super();
            this.type = type;
            this.token = {};
        }
    },

    /**
     * Subclasses should override this.
     *
     * @method query
     * @memberof ObjectService#
     */
    query: {
        value: function (selector) {
            // Implemented in subclasses.
        }
    },

    /**
     * Subclasses can use this method to asynchronously generate test data.
     * After this method is called the provided callback is repeatedly called
     * at intervals randomly chosen between minDelay and maxDelay until either
     * the callback returns a falsy value or another call is made to
     * repeatAsynchronously() with a true value for the replace parameter.
     *
     * TODO: Reformat this comment if necessary to make it fit the JSDoc format.
     */
    repeatAsynchronously: {
        value: function (callback, replace, minDelay, maxDelay) {
            // The object service's token is used to implement the "replace"
            // functionality by allowing queries that a replaced to know that
            // they need to stop themselves.
            var self = this;
            var token = this.token = replace ? {} : this.token;
            var delay = this.randomInteger(minDelay, maxDelay);
            window.setTimeout(function repeated() {
                var delay = self.randomInteger(minDelay || 0, maxDelay || 0);
                if (token === self.token && callback.call(self)) {
                    window.setTimeout(repeated, delay);
                }
            }, delay);
        }
    },

    /**
     * Subclasses can use this method to generate random test data.
     *
     * TODO: Reformat this comment if necessary to make it fit the JSDoc format.
     */
    randomInteger: {
        value: function (min, max) {
            // This is made to work even if max < min.
            var realMin = Math.floor(Math.min(min, max));
            var realMax = Math.floor(Math.max(min, max));
            var random = (realMin < realMax) ? this.randomNumber(realMin, realMax + 1) : realMin;
            return Math.floor(random);
        }
    },

    /**
     * Subclasses can use this method to generate random test data.
     *
     * TODO: Reformat this comment if necessary to make it fit the JSDoc format.
     */
    randomNumber: {
        value: function (min, max) {
            // This is made to work even if max < min.
            var realMin = Math.min(min, max);
            var realMax = Math.max(min, max);
            var random = (realMin < realMax) ? Math.random() : 0;
            return realMin + random * (realMax - realMin);
        }
    }
});
