"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_function_1 = require("./location.function");
const point_class_1 = require("./point.class");
const region_class_1 = require("./region.class");
describe("Location", () => {
    it("should return the center point of an area.", () => {
        const expected = new point_class_1.Point(2, 2);
        const testRegion = new region_class_1.Region(0, 0, 4, 4);
        expect(location_function_1.centerOf(testRegion)).resolves.toEqual(expected);
    });
    it("should return a random point inside of an area.", async () => {
        const testRegion = new region_class_1.Region(100, 20, 50, 35);
        const result = await location_function_1.randomPointIn(testRegion);
        expect(result.x).toBeGreaterThanOrEqual(testRegion.left);
        expect(result.x).toBeLessThanOrEqual(testRegion.left + testRegion.width);
        expect(result.y).toBeGreaterThanOrEqual(testRegion.top);
        expect(result.y).toBeLessThanOrEqual(testRegion.top + testRegion.height);
    });
});
//# sourceMappingURL=location.function.spec.js.map