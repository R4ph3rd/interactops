"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_class_1 = require("./image.class");
const match_request_class_1 = require("./match-request.class");
const region_class_1 = require("./region.class");
describe("MatchRequest", () => {
    it("should default to multi-scale matching", () => {
        const SUT = new match_request_class_1.MatchRequest(new image_class_1.Image(100, 100, new ArrayBuffer(0), 3), "foo", new region_class_1.Region(0, 0, 100, 100), 0.99);
        expect(SUT.searchMultipleScales).toBeTruthy();
    });
});
//# sourceMappingURL=match-request.class.spec.js.map