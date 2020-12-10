"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cv = __importStar(require("opencv4nodejs-prebuilt"));
const sneer_1 = require("sneer");
const match_image_function_1 = require("./match-image.function");
describe("matchImages", () => {
    it("should return minLoc position and needle size", async () => {
        // GIVEN
        const minLocX = 100;
        const minLocY = 1000;
        const matchMock = sneer_1.mockPartial({
            minMaxLocAsync: jest.fn(() => Promise.resolve({
                maxLoc: new cv.Point2(200, 2000),
                maxVal: 100,
                minLoc: new cv.Point2(minLocX, minLocY),
                minVal: 0,
            }))
        });
        const haystackMock = sneer_1.mockPartial({
            matchTemplateAsync: jest.fn(() => Promise.resolve(matchMock))
        });
        const needleMock = sneer_1.mockPartial({
            cols: 123,
            rows: 456
        });
        // WHEN
        const result = await match_image_function_1.matchImages(haystackMock, needleMock);
        // THEN
        expect(result.location.left).toEqual(minLocX);
        expect(result.location.top).toEqual(minLocY);
        expect(result.location.width).toEqual(needleMock.cols);
        expect(result.location.height).toEqual(needleMock.rows);
    });
});
//# sourceMappingURL=match-image.function.spec.js.map