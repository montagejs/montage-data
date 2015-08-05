var DataStream = require("montage-data/logic/service/data-stream").DataStream;

describe("A DataStream", function() {

    it ("can be created", function () {
        expect(new DataStream()).toBeDefined();
    });

    it ("has a an initially empty data array", function () {
        var stream = new DataStream();
        var data = stream.data;
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toEqual(0);
    });

    it ("does not change its data array", function () {
        var stream = new DataStream();
        var data = stream.data;
        expect(stream.data).toBe(data);
    });

    it ("accepts requests for data", function () {
        expect(new DataStream().requestData()).toBeUndefined();
    });

    it ("is thenable", function () {
        expect(new DataStream().then).toEqual(jasmine.any(Function));
    });

    it ("is catchable", function () {
        expect(new DataStream().catch).toEqual(jasmine.any(Function));
    });

});
