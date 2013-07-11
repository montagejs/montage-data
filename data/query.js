/**
 @module montage/data/query
 @requires montage/core/core
 @requires montage/core/logger
 */
var Montage = require("montage").Montage;
var Selector = require("montage/core/selector").Selector;
var logger = require("montage/core/logger").logger("query");
/**
 * A query is the description of the fetch of bunch of object from the backing store. It is comprised of two elements a blueprint describing what to fetch and a selector restricting the objects to fetch.
 @class module:montage/data/query.Query
 */
var Query = exports.Query = Montage.specialize(/** @lends module:montage/data/query.Query# */ {

    constructor: {
        value: function Query() {
            this.super();
        }
    },

    /**
     * @private
     */
    _blueprint:{
        value:null,
        serializable:true
    },

    /**
     Blueprint of the object to fetch with this query
     @type {Property}
     @default {Blueprint} null
     */
    blueprint:{
        get:function () {
            return this._blueprint;
        }
    },

    /**
     * @private
     */
    _selector:{
        value:null,
        serializable:true
    },

    /**
     Selector to use to qualify this query
     @type {Property}
     @default {Selector} null
     */
    selector:{
        get:function () {
            return this._selector;
        }
    },

    /**
     * Name of this query. The name is used when the query is stored in the binder for retrieval at run time.
     @type {Property}
     @default {String} ""
     */
    name:{
        serializable:true,
        enumerable:true,
        value:""
    },

    /**
     * @private
     */
    _parameters:{
        value:{},
        serializable:true,
        distinct:true,
        enumerable:false,
        writable:false
    },


    /**
     * Parameters to use when evaluating the selectors for this query
     @type {Property}
     @default  {String}{}
     */
    parameters:{
        get:function () {
            return this._parameters;
        }
    },

    /**
     Description TODO
     @function
     @param {Function} blueprint TODO
     @returns this.initWithBlueprintAndSelector(blueprint, null)
     */
    initWithBlueprint:{
        enumerable:true,
        value:function (blueprint) {
            return this.initWithBlueprintSelectorAndParameters(blueprint, null, null);
        }
    },

    /**
     Description TODO
     @function
     @param {Function} blueprint TODO
     @param {Selector} selector TODO
     @returns itself
     */
    initWithBlueprintAndSelector:{
        enumerable:true,
        value:function (blueprint, selector) {
            return this.initWithBlueprintSelectorAndParameters(blueprint, selector, null);
        }
    },

    /**
     Description TODO
     @function
     @param {Function} blueprint TODO
     @param {Selector} selector TODO
     @param {Dictionary} parameters TODO
     @returns itself
     */
    initWithBlueprintSelectorAndParameters:{
        enumerable:true,
        value:function (blueprint, selector, parameters) {
            this._blueprint = blueprint;
            if (selector != null) {
                if (Selector.isPrototypeOf(selector)) {
                    this._selector = selector;
                } else {
                    throw new Error("Selector is not a selector: " + JSON.stringify(selector));
                }
            }
            if (parameters != null) {
                var parametersNames = Object.getOwnPropertyNames(parameters);
                var parameter, parameterName, index;
                for (index = 0; typeof (parameterName = parametersNames[index]) !== "undefined"; index++) {
                    parameter = parameters[parameterName];
                    this._parameters[parameterName] = parameter;
                }
            }
            return this;
        }
    },

    /**
     Description TODO
     @function
     @param {Function} propertyPath TODO
     @returns this.selector
     */
    where:{
        value:function (selector) {
            if (selector != null) {
                if (Selector.isPrototypeOf(selector)) {
                    this._selector = selector;
                } else {
                    throw new Error("Selector is not a selector: " + JSON.stringify(selector));
                }
            }
            return this;
        }
    }

});
