/**
 * @module ui/main.reel
 * @requires core/cache
 */
var Component = require("montage/ui/component").Component,
	Cache = require("core/cache").Cache,
	CacheEntry = require("core/cache").CacheEntry;

/**
 * @class Main
 * @extends Component
 * Mockup of CachedData
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
            var cache = new Cache();

            var cacheEntry1 = new CacheEntry();
            cacheEntry1.data = 'Local Data';
            cacheEntry1.metadata = {"type": "", "dataSize": 100};
            var cacheEntry2 = new CacheEntry();
            cacheEntry2.data = "Region1";
            cacheEntry2.metadata = {"type":"Media", "dataSize": 40};  
            var cacheEntry4 = new CacheEntry();
            cacheEntry4.data = "Pictures";
            cacheEntry4.metadata = {"type":"jpg", "dataSize": 15};
            var cacheEntry5 = new CacheEntry();
            cacheEntry5.data = "Videos";
            cacheEntry5.metadata = {"type":"mp4", "dataSize": 20};
            var cacheEntry6 = new CacheEntry();
            cacheEntry6.data = "Information";
            cacheEntry6.metadata = {"type":"txt", "dataSize": 5};
            cacheEntry2.subentries = [cacheEntry4, cacheEntry5, cacheEntry6];
            var cacheEntry3 = new CacheEntry();
            cacheEntry3.data = "Region2";
            cacheEntry3.metadata = {"type":"Media", "dataSize": 60};
            cacheEntry1.subentries = [cacheEntry2, cacheEntry3];
            var cacheEntry7 = new CacheEntry();
            cacheEntry7.data = "Pictures";
            cacheEntry7.metadata = {"type":"jpg", "dataSize": 18};
            var cacheEntry8 = new CacheEntry();
            cacheEntry8.data = "Videos";
            cacheEntry8.metadata = {"type":"mp4", "dataSize": 40};
            var cacheEntry9 = new CacheEntry();
            cacheEntry9.data = "Information";
            cacheEntry9.metadata = {"type":"txt", "dataSize": 2};
            cacheEntry3.subentries = [cacheEntry7, cacheEntry8, cacheEntry9];

            cache.entry = cacheEntry1;
            this.cache = cache;
        }
    },

    cache: {
    	value: null
    }
});
