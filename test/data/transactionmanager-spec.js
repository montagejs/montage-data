var Montage = require("montage").Montage;
var TransactionId = require("data/transaction-id").TransactionId;
var TransactionManager = require("data/transaction-id").TransactionManager;
var logger = require("montage/core/logger").logger("transactionmanager-spec");

describe("data/transactionmanager-spec",
    function () {
        describe("Creation of Transaction ID",
            function () {
                it("with factory",
                    function () {
                        var id = new TransactionId().initWithMappingSetName("folder");

                        // expect(id).toBe("manager.name");
                    });

                it("in sequential order and check of before function",
                    function () {
                        var id1 = new TransactionId().initWithMappingSetName("folder");
                        var id2 = new TransactionId().initWithMappingSetName("folder");

                        expect(id1.before(id2)).toBe(true);
                        expect(id2.before(id1)).toBe(false);
                    });

                it("in sequential order and check of after function",
                    function () {
                        var id1 = new TransactionId().initWithMappingSetName("folder");
                        var id2 = new TransactionId().initWithMappingSetName("folder");

                        expect(id1.after(id2)).toBe(false);
                        expect(id2.after(id1)).toBe(true);
                    });
            });
        describe("Creation of Transaction Manager",
            function () {
                it("singleton",
                    function () {
                        var manager = TransactionId.manager;
                        expect(manager.traceTransactionStart).toBe(false);

                    })
            })

    });
