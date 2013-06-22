var Montage = require("montage").Montage;

var BinderHelper = require("test/data/object/binderhelper").BinderHelper;
var binder = BinderHelper.companyBinder();
var blueprint = binder.blueprintForPrototype("Project", "test/data/object/project");

var Project = exports.Project = blueprint.create(Montage, {

    constructor: {
        value: function Project() {
            this.super();
        }
    }

    // Token class

});
