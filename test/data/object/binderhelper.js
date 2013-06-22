var Montage = require("montage").Montage;
var DataBinder = require("data/model/data-binder").DataBinder;

exports.companyBinder = function () {
    return exports.BinderHelper.companyBinder();
};

exports.BinderHelper = Montage.specialize({

    constructor: {
        value: function BinderHelper() {
            this.super();
        }
    },

},{

    companyBinder: {
        value: function() {
            var companyBinder = new DataBinder().initWithNameAndRequire("CompanyBinder", global.require);

            var personBlueprint = companyBinder.addBlueprintNamed("Person", "test/data/object/person");
            personBlueprint.addToOnePropertyBlueprintNamed("name");
            personBlueprint.addToManyPropertyBlueprintNamed("phoneNumbers");

            var companyBlueprint = companyBinder.addBlueprintNamed("Company", "test/data/object/company");
            companyBlueprint.addToOnePropertyBlueprintNamed("name");

            companyBlueprint.addToManyAssociationBlueprintNamed("directReports", personBlueprint.addToOneAssociationBlueprintNamed("supervisor"));

            var projectBlueprint = companyBinder.addBlueprintNamed("Project", "test/data/object/project");
            projectBlueprint.addToOnePropertyBlueprintNamed("name");
            projectBlueprint.addToOnePropertyBlueprintNamed("startDate");
            projectBlueprint.addToOnePropertyBlueprintNamed("endDate");

            companyBlueprint.addToManyAssociationBlueprintNamed("projects", personBlueprint.addToOneAssociationBlueprintNamed("company"));

            personBlueprint.addToManyAssociationBlueprintNamed("projects", projectBlueprint.addToManyAssociationBlueprintNamed("contributors"));

            DataBinder.manager.addBinder(companyBinder);

            return companyBinder;
        }
    }

});
