/**
 * @module core/object-stream
 */
var Montage = require("montage").Montage;
var Promise = require("montage/core/promise").Promise;

/**
 * @class ObjectStream
 * @augments external:Montage
 *
 * TODO: Make this a promise.
 */
exports.ObjectStream = Montage.specialize(/** @lends ObjectStream.prototype */ {
    /**
     * The selector specified when creating a stream should be the selector
     * passed in to the query call that created the stream. This allows streams
     * to be routed appropriately when they are returned from query calls.
     *
     * TODO: Reformat this comment if necessary to make it fit the JSDoc format.
     */
    constructor: {
        value: function ObjectStream(selector) {
            this.super();
            this.selector = selector;
            this.listeners = [];
            this.settled = false;
        }
    },

    /**
     * Call this method to add an array of data values to the stream.
     */
    add: {
        value: function (values) {
            // Instead of the original listener array, a copy is used by the
            // loop because the original listener array may be changed by calls
            // made inside the loop.
            var listeners = this.settled ? [] : this.listeners.slice();
            var i, j, n, m;
            for (i = 0, n = values.length; i < n; ++i) {
                for (j = 0, m = listeners.length; j < m; ++j) {
                    listeners[j].call(this, values[i]);
                }
            }
        }
    },

    /**
     * Minimally functional placeholder for Promise resolve(). TODO: Implement
     * fully according to Promises specification.
     */
    resolve: {
        value: function (values) {
            if (!this.settled) {
                this.settled = true;
                if (this.onFulfilled) {
                    this.onFulfilled.call(this, values);
                }
                if (this.next) {
                    this.next.resolve(values);
                }
            }
        }
    },

    /**
     * Minimally functional placeholder for Promise reject(). TODO: Implement
     * fully according to Promises specification.
     */
    reject: {
        value: function (reason) {
            if (!this.settled) {
                this.settled = true;
                if (this.onRejected) {
                    this.onRejected.call(this, values);
                }
                if (this.next) {
                    this.next.reject(values);
                }
            }
        }
    },

    /**
     * Listeners specified through this method will be called for each data
     * value added to the stream. Adding listeners is an O(n) operation.
     */
    listen: {
        value: function (listener) {
            if (!this.settled) {
                var index = this.listeners.indexOf(listener);
                if (index < 0) {
                    this.listeners.push(listener);
                }
            }
        }
    },

    /**
     * Minimally functional placeholder for Promise then(). TODO: Implement
     * fully according to Promises specification.
     */
    then: {
        value: function (onFulfilled, onRejected) {
            var self = this;
            this.onFulfilled = onFulfilled;
            this.onRejected = onRejected;
            this.next = Promise.defer();
            return this.next;
        }
    }
});
