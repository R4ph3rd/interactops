"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const image_reader_class_1 = require("./image-reader.class");
const scale_image_function_1 = require("./scale-image.function");
const image_processor_class_1 = require("./image-processor.class");
describe("scaleImage", () => {
    it.each([[0.5], [1.5]])("should scale an image correctly by factor %f", async (scaleFactor) => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const pathToinput = path.resolve(__dirname, "./__mocks__/mouse.png");
        const inputImage = await imageLoader.load(pathToinput);
        const inputMat = await image_processor_class_1.fromImageWithoutAlphaChannel(inputImage);
        const expectedWidth = Math.floor(inputMat.cols * scaleFactor);
        const expectedHeight = Math.floor(inputMat.rows * scaleFactor);
        // WHEN
        const result = await scale_image_function_1.scaleImage(inputMat, scaleFactor);
        // THEN
        expect(result.rows).toBe(expectedHeight);
        expect(result.cols).toBe(expectedWidth);
    });
    it.each([[0], [-0.25]])("should keep scale if factor <= 0: Scale %f", async (scaleFactor) => {
        // GIVEN
        const imageLoader = new image_reader_class_1.ImageReader();
        const pathToinput = path.resolve(__dirname, "./__mocks__/mouse.png");
        const inputImage = await imageLoader.load(pathToinput);
        const inputMat = await image_processor_class_1.fromImageWithoutAlphaChannel(inputImage);
        const expectedWidth = inputMat.cols;
        const expectedHeight = inputMat.rows;
        // WHEN
        const result = await scale_image_function_1.scaleImage(inputMat, scaleFactor);
        // THEN
        expect(result.rows).toBe(expectedHeight);
        expect(result.cols).toBe(expectedWidth);
    });
});
//# sourceMappingURL=scale-image.function.spec.js.map