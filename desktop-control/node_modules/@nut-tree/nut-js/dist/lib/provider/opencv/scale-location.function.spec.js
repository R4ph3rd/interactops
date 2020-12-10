"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const region_class_1 = require("../../region.class");
const scale_location_function_1 = require("./scale-location.function");
describe("scaleLocation", () => {
    it("should scale location of a Region for valid scale factors", () => {
        // GIVEN
        const scaleFactor = 0.5;
        const inputRegion = new region_class_1.Region(100, 100, 10, 10);
        const expectedRegion = new region_class_1.Region(200, 200, 10, 10);
        // WHEN
        const result = scale_location_function_1.scaleLocation(inputRegion, scaleFactor);
        // THEN
        expect(result).toEqual(expectedRegion);
    });
    it("should not scale location of a Region for invalid scale factors", () => {
        // GIVEN
        const scaleFactor = 0.0;
        const inputRegion = new region_class_1.Region(100, 100, 10, 10);
        const expectedRegion = new region_class_1.Region(100, 100, 10, 10);
        // WHEN
        const result = scale_location_function_1.scaleLocation(inputRegion, scaleFactor);
        // THEN
        expect(result).toEqual(expectedRegion);
    });
});
//# sourceMappingURL=scale-location.function.spec.js.map