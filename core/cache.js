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

