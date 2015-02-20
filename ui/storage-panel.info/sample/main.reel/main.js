/**
 * @module ui/main.reel
 * @requires core/cache
 */
var Component = require("montage/ui/component").Component,
Cache = require("logic/cache").Cache,
CacheEntry = require("logic/cache-entry").CacheEntry;

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
            this.cache.entry.data = {};
            this.cache.entry.metadata = {"type": "", "dataSize": 100, "description": "Local Data"};
            this.cache.entry.subEntries = [new CacheEntry(), new CacheEntry()];
            this.cache.entry.subEntries[0].data = {};
            this.cache.entry.subEntries[0].metadata = {"type":"Media", "dataSize": 40, "description": "Region1"};
            this.cache.entry.subEntries[0].subEntries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entry.subEntries[0].subEntries[0].data = {};
            this.cache.entry.subEntries[0].subEntries[0].metadata = {"type":"jpg", "dataSize": 15, "description": "Pictures"};
            this.cache.entry.subEntries[0].subEntries[1].data = {};
            this.cache.entry.subEntries[0].subEntries[1].metadata = {"type":"mp4", "dataSize": 20, "description": "Videos"};
            this.cache.entry.subEntries[0].subEntries[2].data = {};
            this.cache.entry.subEntries[0].subEntries[2].metadata = {"type":"txt", "dataSize": 5, "description": "Information"};
            this.cache.entry.subEntries[1].data = {};
            this.cache.entry.subEntries[1].metadata = {"type":"Media", "dataSize": 60, "description": "Region2"};
            this.cache.entry.subEntries[1].subEntries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entry.subEntries[1].subEntries[0].data = {};
            this.cache.entry.subEntries[1].subEntries[0].metadata = {"type":"jpg", "dataSize": 18, "description": "Pictures"};
            this.cache.entry.subEntries[1].subEntries[1].data = {};
            this.cache.entry.subEntries[1].subEntries[1].metadata = {"type":"mp4", "dataSize": 40, "description": "Videos"};
            this.cache.entry.subEntries[1].subEntries[2].data = {};
            this.cache.entry.subEntries[1].subEntries[2].metadata = {"type":"txt", "dataSize": 2, "description": "Information"};
        }
    },
    cache: {
    	value: null
    }
});


