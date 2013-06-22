var Montage = require("montage").Montage;

var BinderHelper = require("test/data/object/binderhelper").BinderHelper;
var binder = BinderHelper.companyBinder();
var blueprint = binder.blueprintForPrototype("Person", "test/data/object/person");

var Person = exports.Person = blueprint.create(Montage, {

    constructor: {
        value: function Person() {
            this.super();
        }
    }

    // Token class

});
