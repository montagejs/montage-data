/**
 * @module logic/cache-entry
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class CacheEntry
 * @extends Montage
 */
var CacheEntry = exports.CacheEntry = Montage.specialize(/** @lends CacheEntry# */ {
    constructor: {
        value: function CacheEntry(data, metadata, subEntries) {
            this.super();
            this.data = data;
            this.metadata = metadata || {};
            this.subEntries = subEntries || [];
        }
    },

    /**
     * @type {Object}
     */
    data: {
        value: null
    },

    /**
     * @type {Object}
     */
    metadata: {
        value: {}
    },

    /**
     * @type {CacheEntry[]}
     */
    subEntries: {
        value: []
    }
}, {
    /**
     * @method
     * @param {Object[]} properties
     */
    entriesForProperties: {
        value: function entriesForProperties(properties) {
            // Uses a loop instead of Array.prototype.map() because it's about
            // twice as fast (http://jsperf.com/recursive-map-vs-loop).
            var entries = new Array(properties.length);
            var i, n;
            for (i = 0, n = properties.length; i < n; ++i) {
                entries[i] = new CacheEntry(properties[i].data,
                                            properties[i].metadata,
                                            entriesForProperties(properties[i].subEntries));
            }
            return entries;
        }
    }
});

