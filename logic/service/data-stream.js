var DataProvider = require("logic/service/data-provider").DataProvider;

/**
 * An object that represents an operation that may not have completed yet but
 * this is expected to complete in the future if it's not already completed, and
 * that yields a value when it's completed.
 *
 * @external Promise
 * @see {@linkcode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */

/**
 * A [DataProvider]{@link DataProvider} whose data is received sequentially.
 * A DataStreams is also a [Promise]{@linkcode external:Promise} which is
 * fulfilled when all the data it expects has been received.
 *
 * Objects receiving data from a stream will use its
 * [data]{@link DataStream#data} property to access that data. Alternatively
 * they can use its [then()]{@link DataStream#then} method to get that data.
 *
 * Objects putting data in a stream will use its
 * [addData()]{@link DataStream#addData} method to add that data and its
 * [dataDone()]{@link DataStream#dataDone} method to indicate that all available
 * data has been added.
 *
 * Objects can either receive data from a stream or add data to it, but not
 * both. Additionally, only one object can ever add data to a particular
 * stream. Typically that object will be a [Service]{@link DataService}.
 *
 * @class
 * @extends DataProvider
 *
 */
exports.DataStream = DataProvider.specialize(/** @lends DataStream# */{

    _promise: {
        get: function() {
            var self = this;
            if (!this.__promise) {
                this.__promise = new Promise(function(resolve, reject) {
                    self._resolve = resolve;
                    self._reject = reject;
                });
            }
            return this.__promise;
        }
    },

    /**
     * The service responsible for this stream's data.
     *
     * @type {DataService}
     */
    service: {
        value: undefined
    },

    /**
     * The type of the objects making up this stream's data.
     *
     * @type {ObjectDescriptor}
     */
    type: {
        value: undefined
    },

    /**
     * The selector used to select the data in this stream.
     *
     * @type {DataSelector}
     */
    selector: {
        value: undefined
    },

    /**
     * All the objects that has been ever been added to the stream. Property
     * defined by this class' [DataProvider]{@link DataProvider} superclass.
     *
     * @member {Array} DataStream#data
     */

    /**
     * Unused method of this class' [DataProvider]{@link DataProvider}
     * superclass.
     *
     * @method
     * @argument {int} start  - See [superclass]{@link DataProvider#requestData}.
     * @argument {int} length - See [superclass]{@link DataProvider#requestData}.
     */
    requestData: {
        value: function (start, length) {
        }
    },

    /**
     * Add some object to the stream's [data]{@link DataStream#data} array.
     *
     * @method
     * @argument {Array} objects - An array of objects to add to the stream's
     *                             data. If this array is empty or `undefined`,
     *                             no objects are added.
     */
    addData: {
        value: function (objects) {
            var i, n = objects ? objects.length : 0;
            if (n > 0) {
                this.data.length += n;
                for (i = 0; i < n; ++i) {
                    this.data[this._data.length - n + i] = objects[i];
                }
            }
        }
    },

    /**
     * To be called when all the data expected by this stream has been added to
     * its [data]{@link DataStream#data} array.
     *
     * @method
     */
    dataDone: {
        value: function () {
            // Create the promise if necessary.
            this._promise;
            // Resolve the newly or previously created promise.
            this._resolve(this.data);
        }
    },

    /**
     * Method of the [Promise]{@linkcode external:Promise} class used to
     * kick off additional processing when all the data expected by this
     * stream has been received.
     *
     * @method
     * @argument {OnFulfilled} onFulfilled - Called when the DataStream has
     *                                       received all the data it is
     *                                       expected to receive. From the
     *                                       moment this callback is first
     *                                       called neither the DataStream's
     *                                       [data]{@link DataStream#data} array
     *                                       nor the contents of that array will
     *                                       ever change again.
     * @argument {OnRejected} onRejected -   DataStreams are never rejected so
     *                                       rejection callbacks passed in to
     *                                       this method are never called.
     */
    then: {
        value: function (onFulfilled, onRejected) {
            return this._promise.then(onFulfilled, onRejected);
        }
    },

    /**
     * Unused method of the [Promise]{@linkcode external:Promise} class.
     *
     * @method
     * @argument {OnRejected} onRejected - Rejection callback. DataStreams are
     *                                     never rejected so callbacks passed
     *                                     in to this method are never called.
     */
    catch: {
        value: function (onRejected) {
            return this._promise.catch(onRejected);
        }
    }

});
