/**
 * @module core/object-selector
 */
var Montage = require("montage").Montage;

/**
 * Passed in to an
 * {@link module:core/object-service~ObjectService ObjectService} query to
 * define which objects should be returned by this query.
 *
 * @class ObjectSelector
 * @alias ObjectSelector
 * @augments external:Montage
 * @param type {string} - Sets the selector's type.
 * @property {string} type - An arbitrary string that allows queries to be
 *                           routed to an appropriate ObjectService: Queries are
 *                           generally routed to a ObjectService whose type
 *                           matches the query selector's type.
 */
exports.ObjectSelector = Montage.specialize(/** @lends ObjectSelector.prototype */ {
    constructor: {
        value: function ObjectSelector(type) {
            this.super();
            this.type = type;
        }
    }
});
