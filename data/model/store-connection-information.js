/**
 @module montage/data/store-connection-information
 @requires montage/core/core
 @requires montage/core/logger
 */
var Montage = require("montage").Montage;
var logger = require("montage/core/logger").logger("store-connection-information");
/**
 @class module:montage/data/store-connection-information.StoreConnectionInformation
 @extends module:montage/core/core.Montage
 */
var StoreConnectionInformation = exports.StoreConnectionInformation = Montage.specialize(/** @lends module:montage/data/store-connection-information.StoreConnectionInformation# */ {

    constructor: {
        value: function StoreConnectionInformation() {
            this.super();
        }
    },

    initWithNameAndInformation:{
        value:function (name, url, username, password) {
            this._name = name;
            this._url = url;
            this._username = username;
            this._password = password;
            return this;
        }
    },

    equals:{
        value:function (other) {
            if (!other) {
                return false;
            }
            var otherMetadata = Montage.getInfoForObject(other);
            if (!otherMetadata) {
                return false;
            }
            var thisMetadata = Montage.getInfoForObject(this);
            if ((otherMetadata.objectName === thisMetadata.objectName) && (otherMetadata.moduleId === thisMetadata.moduleId)) {
                return (this._name === other._name) && (this._url === other._url) && (this._username === other._username) && (this._password === other._password);
            }
            return false;
        }
    },

    /**
     @private
     */
    _name:{
        serializable:true,
        enumerable:false,
        value:null
    },

    /**
     Name of the object. The name is used to identify the connection information.
     @function
     @returns {String} this._name
     */
    name:{
        get:function () {
            return this._name;
        }
    },

    /**
     @private
     */
    _url:{
        serializable:true,
        enumerable:false,
        value:null
    },

    /**
     Returns the connection url.
     @function
     @returns this._url
     */
    url:{
        get:function () {
            return this._url;
        }
    },

    /**
     @private
     */
    _username:{
        serializable:true,
        enumerable:false,
        value:null
    },

    /**
     Returns the connection username.
     @function
     @returns this._username
     */
    username:{
        get:function () {
            return this._username;
        }
    },

    /**
     @private
     */
    _password:{
        serializable:true,
        enumerable:false,
        value:null
    },

    /**
     Returns the connection password.
     @function
     @returns this._password
     */
    password:{
        get:function () {
            return this._password;
        }
    }

});
