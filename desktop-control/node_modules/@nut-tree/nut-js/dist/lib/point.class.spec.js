"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_class_1 = require("./point.class");
describe("Point", () => {
    it("should return a proper string representation.", () => {
        const point = new point_class_1.Point(10, 15);
        const expected = "(10, 15)";
        expect(point.toString()).toEqual(expected);
    });
});
//# sourceMappingURL=point.class.spec.js.map