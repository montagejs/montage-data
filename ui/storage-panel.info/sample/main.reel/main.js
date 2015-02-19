/**
 * @module ui/main.reel
 * @requires core/cache
 */
var Component = require("montage/ui/component").Component,
Cache = require("core/cache").Cache,
CacheEntry = require("core/cacheEntry").CacheEntry;

/**
 * @class Main
 * @extends Component
 * Mockup of CachedData
 */

exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();
            this.cache = new Cache();
            this.cache.entry = new CacheEntry();
            this.cache.entry.data = 'Local Data';
            this.cache.entry.metadata = {"type": "", "dataSize": 100};
            this.cache.entry.subentries = [new CacheEntry(), new CacheEntry()];
            this.cache.entry.subentries[0].data = "Region1";
            this.cache.entry.subentries[0].metadata = {"type":"Media", "dataSize": 40};
            this.cache.entry.subentries[0].subentries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entry.subentries[0].subentries[0].data = "Pictures";
            this.cache.entry.subentries[0].subentries[0].metadata = {"type":"jpg", "dataSize": 15};
            this.cache.entry.subentries[0].subentries[1].data = "Videos";
            this.cache.entry.subentries[0].subentries[1].metadata = {"type":"mp4", "dataSize": 20};
            this.cache.entry.subentries[0].subentries[2].data = "Information";
            this.cache.entry.subentries[0].subentries[2].metadata = {"type":"txt", "dataSize": 5};
            this.cache.entry.subentries[1].data = "Region2";
            this.cache.entry.subentries[1].metadata = {"type":"Media", "dataSize": 60};
            this.cache.entry.subentries[1].subentries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entry.subentries[1].subentries[0].data = "Pictures";
            this.cache.entry.subentries[1].subentries[0].metadata = {"type":"jpg", "dataSize": 18};
            this.cache.entry.subentries[1].subentries[1].data = "Videos";
            this.cache.entry.subentries[1].subentries[1].metadata = {"type":"mp4", "dataSize": 40};
            this.cache.entry.subentries[1].subentries[2].data = "Information";
            this.cache.entry.subentries[1].subentries[2].metadata = {"type":"txt", "dataSize": 2};
        }
    },
    cache: {
    	value: null
    }
});
