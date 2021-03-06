/**
 @module montage/data/nosql-mapping
 @requires montage/core/core
 @requires montage/core/logger
 @requires montage/data/mapping
 */
var Montage = require("montage").Montage;
var BinderMapping = require("data/model/mapping").BinderMapping;
var BlueprintMapping = require("data/model/mapping").BlueprintMapping;
var AttributeMapping = require("data/model/mapping").AttributeMapping;
var AssociationMapping = require("data/model/mapping").AssociationMapping;
var logger = require("core/logger").logger("nosql-mapping");

/**
 * TODO
 @class module:montage/data/nosql-access/nosql-mapping.NoSqlBinderMapping
 @extends module:montage/data/mapping.BinderMapping
 */
var NoSqlBinderMapping = exports.NoSqlBinderMapping = Montage.create(BinderMapping, /** @lends module:montage/data/nosql-access/nosql-mapping.NoSqlBinderMapping# */ {


});


/**
 * TODO
 @class module:montage/data/nosql-access/nosql-mapping.NoSqlBlueprintMapping
 @extends module:montage/data/mapping.BlueprintMapping
 */
var NoSqlBlueprintMapping = exports.NoSqlBlueprintMapping = Montage.create(BlueprintMapping, /** @lends module:montage/data/nosql-access/nosql-mapping.NoSqlBlueprintMapping# */ {


});


/**
 * TODO
 @class module:montage/data/nosql-access/nosql-mapping.NoSqlAttributeMapping
 @extends module:montage/data/mapping.AttributeMapping
 */
var NoSqlAttributeMapping = exports.NoSqlAttributeMapping = Montage.create(AttributeMapping, /** @lends module:montage/data/nosql-access/nosql-mapping.NoSqlAttributeMapping# */ {


});


/**
 * TODO
 @class module:montage/data/nosql-access/nosql-mapping.NoSqlAssociationMapping
 @extends module:montage/data/mapping.AssociationMapping
 */
var NoSqlAssociationMapping = exports.NoSqlAssociationMapping = Montage.create(AssociationMapping, /** @lends module:montage/data/nosql-access/nosql-mapping.NoSqlAssociationMapping# */ {


});

