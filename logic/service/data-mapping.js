var Montage = require("montage").Montage;

/**
 * Customize a Montage type.
 *
 * @external specialize
 * @see {@linkplain http://docs.montagestudio.com/api/Montage.html#specialize}
 */

/**
 * Maps raw data to data of a specific type.
 *
 * Currently services have to subclass this and override its
 * [mapData()]{@link DataMapping#mapData} method to define their mapping. In the
 * future mappings will be defined declaratively through mapping descriptors
 * read from blueprint files.
 *
 * @class
 * @extends external:Montage
 */
exports.DataMapping = Montage.specialize(/** @lends DataMapping# */{

    /**
     * The type of object to map to.
     *
     * @type {ObjectDescriptor}
     */
    type: {
        value: undefined
    },


    /**
     * Convert raw data to objects of an appropriate type.
     *
     * Subclasses should override this method to create an object of the right
     * type with values taken from the passed in raw object. The
     * [specialize()]{@linkcode external:specialize} method of the prototype of
     * the map's type can be used for this, as in the following:
     *
     *     mapData: {
     *         value: function (raw) {
     *             return this.type.prototype.specialize({
     *                 name: {
     *                     value: this.formatName(raw.FIRST, raw.LAST);
     *                 }
     *             });
     *         }
     *     }
     *
     * @method
     * @argument {Object} raw - The raw data, defined as the values of an
     *                          object's properties.
     */
    mapData: {
        value: function (raw) {
            var object = null;
            if (this.type) {
                object = this.type.prototype.specialize({});
            }
            return object;
        }
    }

});
