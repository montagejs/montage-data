var Montage = require("montage").Montage,
    DataStream = require("logic/service/data-stream").DataStream;

/**
 * Provides data objects and potentially manages changes to them.
 *
 * @class
 * @extends external:Montage
 */
exports.DataService = Montage.specialize(/** @lends DataService# */{

    /**
     * Sub-services used to get and manage the types of objects not directly
     * provided and managed by this service.
     *
     * Values can be added or removed from the service map but the map itself
     * cannot be replaced.
     *
     * @type {Map<ObjectDescriptor, DataService>}
     */
    services: {
        get: function() {
            if (!this._services) {
                this._services = new Map();
            }
            return this._services;
        }
    },

    /**
     * Maps raw data to objects to be returned by this service.
     *
     * To be defined when this service is set up.
     *
     * @type {Object}
     */
    mapping: {
        value: null
    },

    /**
     * Provide data to a data stream.
     *
     * @method
     * @argument {ObjectDescriptor} type - The type of the data requested.
     * @argument {DataSelector} selector - Criteria that the returned data
     *                                     objects need to satisfy.
     * @argument {DataStream} stream     - The stream to which the provided data
     *                                     should be added. If not stream is
     *                                     provided a stream will be created and
     *                                     returned by this method.
     */
    requestData: {
        value: function (type, selector, stream) {
            // Set up the stream
            if (!stream) {
                stream = new DataStream();
            }
            if (!stream.service) {
                stream.service = this;
            }
            stream.type = type;
            stream.selector = selector;
            // Get the raw data.
            this.requestRawData(type, selector, stream, this.addRawData)
            // Return the passed in or created stream.
            return stream;
        }
    },

    /**
     * @method
     */
    requestRawData: {
        value: function (type, selector, context, callback) {
            // To be implemented in subclasses.
        }
    },

    /**
     * @method
     */
    addRawData: {
        value: function (stream, raw) {
            var i, n = raw ? raw.length : 0;
            for (i = 0; i < n; ++i) {
                stream.add([this.mapping.mapData(raw[i])]);
            }
        }
    }

});
