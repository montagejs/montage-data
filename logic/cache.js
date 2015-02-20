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
    }
});

