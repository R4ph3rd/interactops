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
const image_class_1 = require("../../image.class");
class ImageReader {
    async load(path) {
        return new Promise(async (resolve, reject) => {
            try {
                const image = await cv.imreadAsync(path, cv.IMREAD_UNCHANGED);
                resolve(new image_class_1.Image(image.cols, image.rows, image.getData(), image.channels));
            }
            catch (e) {
                reject(`Failed to load image from '${path}'`);
            }
        });
    }
}
exports.ImageReader = ImageReader;
//# sourceMappingURL=image-reader.class.js.map