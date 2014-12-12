/**
 * @module logic/object-stream.js
 *
 * This code is temporarily in the Contour project but meant to eventually be
 * part of the Montage-Data project.
 */
var Montage = require("montage").Montage;

/**
 * @class ObjectStream
 * @extends Montage
 *
 * TODO: Make this a promise.
 */
exports.ObjectStream = Montage.specialize(/** @lends ObjectStream.prototype */ {
    constructor: {
        value: function ObjectStream(selector) {
            this.super();
            this.selector = selector;
            this.listeners = [];
        }
    },

    add: {
        value: function (data) {
            // The this.listener array is copied first because called listeners
            // may change the this.listener array.
            var listeners = this.settled ? [] : this.listeners.slice();
            var i, n;
            for (i = 0, n = listeners.length; i < n; ++i) {
                listeners[i].call(this, data);
            }
        }
    },

    listen: {
        value: function (listener) {
            if (!this.settled) {
                this.listeners.push(listener);
            }
        }
    },

    // TODO: Provide an un-listen method?

    resolve: {
        value: function (value) {
            this.settled = true;
            // TODO: Real Promise.resolved() processing.
        }
    },

    reject: {
        value: function (error) {
            this.settled = true;
            // TODO: Real Promise.reject() processing.
        }
    }
});
