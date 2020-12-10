"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sneer_1 = require("sneer");
const match_request_class_1 = require("../../match-request.class");
const region_class_1 = require("../../region.class");
const determine_searchregion_function_1 = require("./determine-searchregion.function");
describe("determineSearchRegion", () => {
    it("should return a search region adopted to pixel density", () => {
        // GIVEN
        const imageMock = sneer_1.mockPartial({
            pixelDensity: {
                scaleX: 1.5,
                scaleY: 2.0
            }
        });
        const needlePath = "/path/to/needle";
        const inputSearchRegion = new region_class_1.Region(0, 0, 100, 100);
        const expectedSearchRegion = new region_class_1.Region(0, 0, 150, 200);
        const matchRequest = new match_request_class_1.MatchRequest(imageMock, needlePath, inputSearchRegion, 0.99);
        // WHEN
        const result = determine_searchregion_function_1.determineScaledSearchRegion(matchRequest);
        // THEN
        expect(result).toEqual(expectedSearchRegion);
    });
    it.each([[0, 1], [1, 0]])("should not adjust searchregion for factor 0: scaleX: %i scaleY: %i", (scaleX, scaleY) => {
        // GIVEN
        const imageMock = sneer_1.mockPartial({
            pixelDensity: {
                scaleX,
                scaleY
            }
        });
        const needlePath = "/path/to/needle";
        const inputSearchRegion = new region_class_1.Region(0, 0, 100, 100);
        const expectedSearchRegion = new region_class_1.Region(0, 0, 100, 100);
        const matchRequest = new match_request_class_1.MatchRequest(imageMock, needlePath, inputSearchRegion, 0.99);
        // WHEN
        const result = determine_searchregion_function_1.determineScaledSearchRegion(matchRequest);
        // THEN
        expect(result).toEqual(expectedSearchRegion);
    });
});
//# sourceMappingURL=determine-searchregion.function.spec.js.map