/**
	@module montage/data/nosql-access/nosql-object-id
    @requires montage/core/core
    @requires montage/data/-object-id
    @requires montage/core/logger
*/
var Montage = require("montage").Montage;
var ObjectId = require("data/object-id").ObjectId;
var logger = require("core/logger").logger("nosql-object-id");
/**
    @class module:montage/data/nosql-access/nosql-object-id.NoSqlObjectId
    @extends module:montage/data/object-id.ObjectId
*/
var NoSqlObjectId = exports.NoSqlObjectId = Montage.create(ObjectId,/** @lends module:montage/data/nosql-access/nosql-object-id.NoSqlObjectId# */ {


});
