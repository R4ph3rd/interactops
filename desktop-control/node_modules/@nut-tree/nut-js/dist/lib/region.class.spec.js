"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const region_class_1 = require("./region.class");
describe("Region", () => {
    it("should calcutate the correct area of a region", () => {
        const region = new region_class_1.Region(0, 0, 100, 100);
        const expected = 10000;
        expect(region.area()).toEqual(expected);
    });
    it("should return a proper string representation", () => {
        const region = new region_class_1.Region(0, 0, 100, 100);
        const expected = "(0, 0, 100, 100)";
        expect(region.toString()).toEqual(expected);
    });
    it("should scale and translate in x", () => {
        const scaleFactor = 2.0;
        const region = new region_class_1.Region(100, 100, 100, 100);
        const result = region_class_1.Region.scaled(region, scaleFactor);
        expect(result.left).toBeCloseTo(region.left * scaleFactor);
        expect(result.width).toBeCloseTo(region.width * scaleFactor);
        expect(result.top).toBeCloseTo(region.top);
        expect(result.height).toBeCloseTo(region.height);
    });
    it("should scale and translate in y", () => {
        const scaleFactor = 2.0;
        const region = new region_class_1.Region(200, 250, 100, 100);
        const result = region_class_1.Region.scaled(region, undefined, scaleFactor);
        expect(result.left).toBeCloseTo(region.left);
        expect(result.width).toBeCloseTo(region.width);
        expect(result.top).toBeCloseTo(region.top * scaleFactor);
        expect(result.height).toBeCloseTo(region.height * scaleFactor);
    });
    it("should scale and translate in both x and y", () => {
        const scaleFactorX = 1.75;
        const scaleFactorY = 2.5;
        const region = new region_class_1.Region(300, 720, 100, 100);
        const result = region_class_1.Region.scaled(region, scaleFactorX, scaleFactorY);
        expect(result.left).toBeCloseTo(region.left * scaleFactorX);
        expect(result.width).toBeCloseTo(region.width * scaleFactorX);
        expect(result.top).toBeCloseTo(region.top * scaleFactorY);
        expect(result.height).toBeCloseTo(region.height * scaleFactorY);
    });
    it("should throw an error when scaling to 0 in x", () => {
        const scaleFactorX = 0.0;
        const scaleFactorY = 2.5;
        const region = new region_class_1.Region(300, 720, 100, 100);
        expect(() => region_class_1.Region.scaled(region, scaleFactorX, scaleFactorY)).toThrow(`Scaling to 0. Please check parameters: scaleX: ${scaleFactorX}, scaleY: ${scaleFactorY}`);
    });
    it("should throw an error when scaling to 0 in y", () => {
        const scaleFactorX = 2.5;
        const scaleFactorY = 0.0;
        const region = new region_class_1.Region(300, 720, 100, 100);
        expect(() => region_class_1.Region.scaled(region, scaleFactorX, scaleFactorY)).toThrow(`Scaling to 0. Please check parameters: scaleX: ${scaleFactorX}, scaleY: ${scaleFactorY}`);
    });
});
//# sourceMappingURL=region.class.spec.js.map