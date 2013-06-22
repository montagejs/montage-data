var Montage = require("montage").Montage;
var ObjectId = require("data/object-id").ObjectId;
var logger = require("montage/core/logger").logger("test-object-id");

var TestObjectId = exports.TestObjectId = Montage.create(ObjectId, {


});
