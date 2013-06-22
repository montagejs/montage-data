var Montage = require("montage").Montage;
var ChangeContext = require("data/change-context").ChangeContext;
var Store = require("data/store").Store;
var StoreManager = require("data/store").StoreManager;
var TransactionId = require("data/transaction-id").TransactionId;
var logger = require("montage/core/logger").logger("context-spec");

var BinderHelper = require("test/data/object/binderhelper").BinderHelper;
var Person = require("test/data/object/person").Person;
var Company = require("test/data/object/company").Company;

describe("data/context-spec", function () {
    StoreManager.defaultManager = null;

    var companyBinder = BinderHelper.companyBinder();
    companyBinder.createMappingForStore(Store.create().init(), "StoreMapping", true);
    var personBlueprint = companyBinder.blueprintForPrototype("Person", "test/data/object/person");

    describe("creation", function () {
        var context = ChangeContext.create().init();

        it("successful", function () {
            expect(context).not.toBe(null);
        });
    });

    describe("insert object", function () {
        var context = ChangeContext.create().init();

        var louis = null;
        it("should be inserted in the context, have an Id and be registered", function () {
            var transactionId = TransactionId.manager.startTransaction("StoreMapping");
            var promise = context.requireStoreForBlueprint(personBlueprint, transactionId).then(function (store) {
                louis = Person.create();
                return context.insert(louis);
            }).then(function (result) {
                    TransactionId.manager.closeTransaction(transactionId);
                    expect(result).not.toBeNull();
                    expect(result.context).toBe(context);
                    expect(result.objectId).not.toBeNull();
                    expect(context.objectForId(louis.objectId)).toBe(result);
                });
        });
    });

    describe("delete object", function () {
        var context = ChangeContext.create().init();

        var louis = null;
        it("should be deleted by the context, and should not be associated with a context", function () {
            debugger;
            var transactionId = TransactionId.manager.startTransaction("StoreMapping");
            var promise = context.requireStoreForBlueprint(personBlueprint, transactionId).then(function (store) {
                louis = Person.create();
                return context.insert(louis).then(function (insertedObject) {
                    return context.delete(insertedObject).then(function (deletedObject) {
                        return deletedObject;
                    });
                })
            }).then(function (result) {
                    TransactionId.manager.closeTransaction(transactionId);
                    expect(result).not.toBeNull();
                    expect(context.objectForId(result.objectId)).toBeNull();
                    expect(result.context).toBeNull();
                });
        });

    });

});
