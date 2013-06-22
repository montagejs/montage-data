var Montage = require("montage").Montage;

var BinderHelper = require("test/data/object/binderhelper").BinderHelper;
var binder = BinderHelper.companyBinder();
var blueprint = binder.blueprintForPrototype("Company", "test/data/object/company");

var Company = exports.Company = blueprint.create(Montage, {

    constructor: {
        value: function Company() {
            this.super();
        }
    }

    // Token class

});
