/**
 * @module logic/cache
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;
/**
 * @class Cache
 * @extends Montage
 */
exports.Cache = Montage.specialize(/** @lends Cache# */ {
    constructor: {
        value: function Cache(entries) {
            this.super();
            this.entries = entries || [];
        }
    },

    /**
     * @type {CacheEntry[]}
     */
    entries: {
        value: []
    },

    /**
     * TODO: Document.
     */
    refresh: {
        value: function(cacheEntry) {
            // TODO.
        }
    },

    /**
     * TODO: Document.
     */
    delete: {
        value: function(cacheEntry) {
            // TODO.
        }
    }
});

