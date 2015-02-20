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
            this.cache.entries = new CacheEntry();
            this.cache.entries.data = {};
            this.cache.entries.metadata = {"type": "", "dataSize": 100, "description": "Local Data"};
            this.cache.entries.subEntries = [new CacheEntry(), new CacheEntry()];
            this.cache.entries.subEntries[0].data = {};
            this.cache.entries.subEntries[0].metadata = {"type":"Media", "dataSize": 40, "description": "Region1"};
            this.cache.entries.subEntries[0].subEntries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entries.subEntries[0].subEntries[0].data = {};
            this.cache.entries.subEntries[0].subEntries[0].metadata = {"type":"jpg", "dataSize": 15, "description": "Pictures"};
            this.cache.entries.subEntries[0].subEntries[1].data = {};
            this.cache.entries.subEntries[0].subEntries[1].metadata = {"type":"mp4", "dataSize": 20, "description": "Videos"};
            this.cache.entries.subEntries[0].subEntries[2].data = {};
            this.cache.entries.subEntries[0].subEntries[2].metadata = {"type":"txt", "dataSize": 5, "description": "Information"};
            this.cache.entries.subEntries[1].data = {};
            this.cache.entries.subEntries[1].metadata = {"type":"Media", "dataSize": 60, "description": "Region2"};
            this.cache.entries.subEntries[1].subEntries = [new CacheEntry(), new CacheEntry(), new CacheEntry()];
            this.cache.entries.subEntries[1].subEntries[0].data = {};
            this.cache.entries.subEntries[1].subEntries[0].metadata = {"type":"jpg", "dataSize": 18, "description": "Pictures"};
            this.cache.entries.subEntries[1].subEntries[1].data = {};
            this.cache.entries.subEntries[1].subEntries[1].metadata = {"type":"mp4", "dataSize": 40, "description": "Videos"};
            this.cache.entries.subEntries[1].subEntries[2].data = {};
            this.cache.entries.subEntries[1].subEntries[2].metadata = {"type":"txt", "dataSize": 2, "description": "Information"};
        }
    },
    cache: {
    	value: null
    }
});


