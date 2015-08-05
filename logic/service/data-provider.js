var Montage = require("montage").Montage;

/**
 * The basis of all types that use the Montage framework.
 *
 * @external Montage
 * @see {@linkcode http://docs.montagestudio.com/api/Montage.html}
 */

/**
 * A well defined set of properties and methods that can be found in objects
 * that adhere to it. Sometimes incorrectly called an interface.
 *
 * @external Protocol
 * @see {@linkplain https://en.wikipedia.org/wiki/Protocol_(object-oriented_programming)}
 */

/**
 * A mechanism that calls a listener function every time the contents of an
 * array are modified in any way.
 *
 * @external RangeChangeListener
 * @see {@linkplain http://www.collectionsjs.com/method/add-range-change-listener}
 */

/**
 * A component that repeats its inner template for each item in an array.
 *
 * @external Repetition
 * @see {@linkcode http://docs.montagestudio.com/api/Repetition.html}
 */

/**
 * This class documents the properties and methods of objects that support the
 * DataProvider [protocol]{@linkplain external:Protocol}. Data provider classes
 * can extend this class but they aren't required to, they just need to have the
 * [data]{@link DataProvider#data} property and the
 * [requestData()]{@link DataProvider#requestData} method of this class.
 *
 * @class
 * @extends external:Montage
 *
 */
exports.DataProvider = Montage.specialize(/** @lends DataProvider# */{

    /**
     * At any point in time a data provider’s [data]{@link DataProvider#data}
     * array and the length of that array represent the state of the data as it
     * is then known to the data provider. If a data provider knows that an item
     * will need to be in its [data]{@link DataProvider#data} array but doesn’t
     * yet know the value of that item, it will place in the array an undefined
     * value for that item. Data providers can’t be used with data that includes
     * actual `undefined` values, so the presence of an `undefined` value in a
     * data provider’s [data]{@link DataProvider#data} array is an unambiguous
     * indication that the value of the corresponding item is expected but
     * hasn’t yet been received.
     *
     * As a data provider receives new data, or if its data changes for any
     * reason, it will update its [data]{@link DataProvider#data} array
     * correspondingly, most notably by replacing `undefined` values with real
     * objects and by changing the array’s length. A
     * [range change listener]{@linkplain external:RangeChangeListener}
     * can be used to monitor those changes, and components like Montage's
     * [Repetition]{@linkcode external:Repetition} will automatically do this
     * monitoring.
     *
     * Although the contents of a data provider's
     * [data]{@link DataProvider#data} array may change over time, the array
     * itself will not change. This class creates the
     * [data]{@link DataProvider#data} array lazilly the first time it is needed
     * and then does not allow that property to change.
     *
     * @type {Array}
     */
    data: {
        get: function() {
            if (!this._data) {
                this._data = [];
            }
            return this._data;
        }
    },

    /**
     * Objects using a data provider can call the provider’s
     * [requestData()]{@link DataProvider#requestData} method to indicate that
     * they want the data in the specified range. If the requested data is not
     * in the provider’s [data]{@link DataProvider#data} array yet, and if that
     * data can be obtained, it will be obtained synchronously or asynchronously
     * and placed in the data array as described in the documentation for the
     * [data]{@link DataProvider#data} property above.
     *
     * When a data provider’s data is obtained asynchronously no guarantee is
     * given about exactly when that data will end up in the provider's
     * [data]{@link DataProvider#data} array. Also, no guarantee is given that a
     * data provider will provide through its [data]{@link DataProvider#data}
     * array only the data specifically requested in
     * [requestData()]{@link DataProvider#requestData} calls: It may obtain and
     * provide more data.
     *
     * In spite of these lack of guarantees data providers try to be smart about
     * what data they provide or withhold based on
     * [requestData()]{@link DataProvider#requestData} calls and based on
     * algorithms specific to each type of provider.
     *
     * This class does nothing when this method is called.
     *
     * @method
     * @argument {int} start  - The index of the start of the range of the
     *                          requested data. When `undefined`, all available
     *                          data is requested.
     * @argument {int} length - The length of the range of the requested data.
     *                          When `undefined`, all available data is
     *                          requested.
     */
    requestData: {
        value: function (start, length) {
        }
    }

});
