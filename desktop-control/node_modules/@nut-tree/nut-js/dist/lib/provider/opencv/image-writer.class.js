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
const image_processor_class_1 = require("./image-processor.class");
class ImageWriter {
    async store(data, path) {
        let outputMat;
        if (data.hasAlphaChannel) {
            outputMat = await image_processor_class_1.fromImageWithAlphaChannel(data);
        }
        else {
            outputMat = await image_processor_class_1.fromImageWithoutAlphaChannel(data);
        }
        return cv.imwriteAsync(path, outputMat);
    }
}
exports.ImageWriter = ImageWriter;
//# sourceMappingURL=image-writer.class.js.map