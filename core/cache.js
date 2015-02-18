/**
 * @module core/cache
 */
var Montage = require("montage").Montage;

/**
 * @class Cache
 * @extends external:Montage
 */
exports.Cache = Montage.specialize(/** @lends Cache.prototype */ {
    constructor: {
        value: function Cache(type) {
            this.super();
        }
    },

    /**
     * @type {CacheEntry[]}
     */
    entry: {
        value: {}
    }
});

/**
 * @class CacheEntry
 * @extends external:Montage
 */
exports.CacheEntry = Montage.specialize(/** @lends CacheEntry.prototype */ {
    constructor: {
        value: function CacheEntry(type) {
            this.super();
        }
    },

    /**
     * @type {CacheEntry[]}
     */
    subentries: {
        value: []
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
        value: {type: null}
    }
});