var Montage = require("montage").Montage;
var Store = require("data/store").Store;
var StoreManager = require("data/store").StoreManager;
var TransactionId = require("data/transaction-id").TransactionId;

var Serializer = require("montage/core/serialization").Serializer;
var Deserializer = require("montage/core/serialization").Deserializer;

var Promise = require("montage/core/promise").Promise;
var logger = require("montage/core/logger").logger("store-spec");

var BinderHelper = require("test/data/object/binderhelper").BinderHelper;

describe("data/store-spec", function () {
    describe("Store Manager", function () {

        describe("creation", function () {
            StoreManager.defaultManager = null;
            var store1 = Store.create().init();
            var store1meta = Montage.getInfoForObject(store1);
            var store2 = Store.create().init();
            var store3 = Store.create().initWithParent(StoreManager.create().init());
            it("the default manager should be unique", function () {
                expect(store1.parent).toBe(store2.parent);
            });
            it("it should be inserted in the default manager", function () {
                expect(store1.parent.stores.indexOf(store1)).toBe(0);
                expect(store1.parent.stores.indexOf(store2)).toBe(1);
            });
            it("it can be in an independent manager", function () {
                expect(store1.parent).not.toBe(store3.parent);
                expect(store3.parent.stores.indexOf(store3)).toBe(0);
            });
        });

    });

    describe("Store", function () {
        Store.defaultManager = null;
        var companyBinder = BinderHelper.companyBinder();
        companyBinder.createMappingForStore(Store.create().init(), "StoreMapping", true);
        var personBlueprint = companyBinder.blueprintForPrototype("Person", "test/data/object/person");
        StoreManager.defaultManager = null;

        it("should be created for the blueprint", function () {
            var transactionId = TransactionId.manager.startTransaction("StoreMapping");
            var storePromise = Store.defaultManager.findStoreForBlueprint(personBlueprint, transactionId);
            return storePromise.then(function (store) {
                TransactionId.manager.closeTransaction(transactionId);
                expect(store).toBeTruthy();
            });
        });

    });

});

