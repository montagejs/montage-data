var Montage = require("montage").Montage,
    DataStream = require("logic/service/data-stream").DataStream;

/**
 * A Function called when raw data is received by a
 * [service]{@link DataService}.
 *
 * @callback AddRawData
 * @argument {DataService} service - The service responsible for the data. This
 *                                   needs to be specified as an argument
 *                                   because this method may be invoked as a
 *                                   callback without a meaningful `this` value.
 * @argument {DataStream} stream   - The stream to which the data objects
 *                                   corresponding to the raw data should be
 *                                   added.
 * @param {Array} objects          - An array of objects containing the raw
 *                                   data. This array and the objects it
 *                                   contains may be modified.
 */

/**
 * Provides data objects and potentially manages changes to them.
 *
 * @class
 * @extends external:Montage
 */
exports.DataService = Montage.specialize(/** @lends DataService# */{

    /**
     * The parent of this service when it is a child of another service, or
     * `null` if it not a child service.
     *
     * @type {DataService}
     */
    parentService: {
        value: null
    },

    /**
     * Map of child services used to get and manage types of objects not
     * directly obtained or managed by this service.
     *
     * Values can be added or removed from the map but the map itself cannot be
     * replaced.
     *
     * @type {Map<ObjectDescriptor, DataService>}
     */
    childServices: {
        get: function() {
            if (!this._services) {
                this._services = new Map();
            }
            return this._services;
        }
    },

    /**
     * Maps the raw data on which this service is based to the data objects
     * returned by this service.
     *
     * Must be defined before the service can be used.
     *
     * @type {Object}
     */
    mapping: {
        value: null
    },

    /**
     * Get data from the service. This is the main method used by clients of
     * this service.
     *
     * This method gets raw data from a server or other source using the
     * [getRawData()]{@link DataService#getRawData} method, maps that data to
     * data objects that fit into an application's data model using the
     * service's [mapping]{@link DataService#mapping}, registers those objects
     * so the service can manage them, and then return those objects in the
     * specified stream or in a new stream created for this purpose.
     *
     * @method
     * @argument {ObjectDescriptor} type - The type of the data requested.
     * @argument {DataSelector} selector - Criteria that the returned data
     *                                     objects must satisfy.
     * @argument {DataStream} stream     - The stream to which the provided data
     *                                     should be added. If not stream is
     *                                     provided a stream will be created and
     *                                     returned by this method.
     */
    getData: {
        value: function (type, selector, stream) {
            // Set up the stream.
            if (!stream) {
                stream = new DataStream();
            }
            if (!stream.service) {
                stream.service = this;
            }
            stream.type = type;
            stream.selector = selector;
            // Asynchronously get the raw data, map it to data objects, register
            // those objects, and add them to the stream.
            this.requestRawData(type, selector, stream, this.addRawData)
            // Return the passed in or created stream.
            return stream;
        }
    },

    /**
     * Get the raw data used by this service.
     *
     * Subclasses override this method to provide the raw data on which they
     * depend.
     *
     * @method
     * @argument {ObjectDescriptor} type - The type of the data requested.
     * @argument {DataSelector} selector - Criteria that the returned data
     *                                     must satisfy, expressed in terms of
     *                                     the data objects the raw data will be
     *                                     mapped to.
     * @argument {DataStream} stream     - The stream to which the data objects
     *                                     corresponding to the raw data should
     *                                     be added.
     * @argument {AddRawData} callback   - The function to be called every time
     *                                     some of the raw data is received.
     */
    getRawData: {
        value: function (type, selector, stream, callback) {
            // To be implemented in subclasses.
        }
    },

    /**
     * To be called by [getRawData()]{@link DataService#getRawData} when raw
     * data is received.
     *
     * This method maps the raw data to data objects using the specified
     * service's [mapping]{@link DataService#mapping}, registers those objects
     * with the service so it can manage them, and then adds those objects to
     * the specified stream.
     *
     * @method
     * @argument {DataService} service - The service responsible for the data.
     *                                   This needs to be specified as an
     *                                   argument because this method may be
     *                                   invoked as a callback without a
     *                                   meaningful `this` value.
     * @argument {DataStream} stream   - The stream to which the data objects
     *                                   corresponding to the raw data should be
     *                                   added.
     * @param {Array} objects          - An array of objects containing the raw
     *                                   data. This array and the objects it
     *                                   contains may be modified.
     */
    addRawData: {
        value: function (service, stream, objects) {
            // Convert the raw data to appropriate data objects.
            var i, n = objects ? objects.length : 0;
            for (i = 0; i < n; ++i) {
                objects[i] = service.mapping.mapData(objects[i]);
            }
            // TO DO: Register the data objects into a snapshot map
            // (for uniquing, change tracking, and reverting).
            // Pass on the converted data.
            stream.addData(objects);
        }
    },

    /**
     * Indicate that all the raw data meant for the specified stream has been
     * added to that stream.
     *
     * Subclasses must call this method once with appropriate values for each
     * [getRawData()]{@link DataService#getRawData} call they receive.
     *
     * @method
     * @argument {DataService} service - The service responsible for the data.
     *                                   This needs to be specified as an
     *                                   argument because this method may be
     *                                   invoked as a callback without a
     *                                   meaningful `this` value.
     * @argument {DataStream} stream -   The stream to which the data objects
     *                                   corresponding to the raw data have been
     *                                   added.
     */
    rawDataDone: {
        value: function (service, stream) {
            stream.dataDone();
        }
    }

});
