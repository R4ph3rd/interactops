"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vision_adapter_class_1 = require("./adapter/vision.adapter.class");
const assert_class_1 = require("./assert.class");
const region_class_1 = require("./region.class");
const screen_class_1 = require("./screen.class");
jest.mock("./adapter/native.adapter.class");
jest.mock("./adapter/vision.adapter.class");
jest.mock("./screen.class");
describe("Assert", () => {
    it("isVisible should not throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.Screen.prototype.find = jest.fn(() => Promise.resolve(new region_class_1.Region(0, 0, 100, 100)));
        const screenMock = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
        const SUT = new assert_class_1.Assert(screenMock);
        const needle = "foo";
        // WHEN
        // THEN
        await expect(SUT.isVisible(needle)).resolves.not.toThrowError();
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.Screen.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
        const SUT = new assert_class_1.Assert(screenMock);
        const needle = "foo";
        // WHEN
        // THEN
        await expect(SUT.isVisible(needle)).rejects.toThrowError(`Element '${needle}' not found`);
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.Screen.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
        const SUT = new assert_class_1.Assert(screenMock);
        const searchRegion = new region_class_1.Region(10, 10, 10, 10);
        const needle = "foo";
        // WHEN
        // THEN
        await expect(SUT
            .isVisible(needle, searchRegion))
            .rejects.toThrowError(`Element '${needle}' not found in region ${searchRegion.toString()}`);
    });
    it("isNotVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.Screen.prototype.find = jest.fn(() => Promise.resolve(new region_class_1.Region(0, 0, 100, 100)));
        const screenMock = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
        const SUT = new assert_class_1.Assert(screenMock);
        const needle = "foo";
        // WHEN
        // THEN
        await expect(SUT.notVisible(needle)).rejects.toThrowError(`'${needle}' is visible`);
    });
    it("isVisible should throw if a match is found.", async () => {
        // GIVEN
        screen_class_1.Screen.prototype.find = jest.fn(() => Promise.reject("foo"));
        const screenMock = new screen_class_1.Screen(new vision_adapter_class_1.VisionAdapter());
        const SUT = new assert_class_1.Assert(screenMock);
        const needle = "foo";
        // WHEN
        // THEN
        await expect(SUT.notVisible(needle)).resolves.not.toThrowError();
    });
});
//# sourceMappingURL=assert.class.spec.js.map