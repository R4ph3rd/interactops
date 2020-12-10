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
function determineROI(img, roi) {
    return new cv.Rect(Math.min(Math.max(roi.left, 0), img.width), Math.min(Math.max(roi.top, 0), img.height), Math.min(roi.width, img.width - roi.left), Math.min(roi.height, img.height - roi.top));
}
/**
 * fromImageWithAlphaChannel should provide a way to create a library specific
 * image with alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
exports.fromImageWithAlphaChannel = async (img, roi) => {
    const mat = await new cv.Mat(img.data, img.height, img.width, cv.CV_8UC4).cvtColorAsync(cv.COLOR_BGRA2BGR);
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    }
    else {
        return mat;
    }
};
/**
 * fromImageWithoutAlphaChannel should provide a way to create a library specific
 * image without alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
exports.fromImageWithoutAlphaChannel = async (img, roi) => {
    const mat = new cv.Mat(img.data, img.height, img.width, cv.CV_8UC3);
    if (roi) {
        return mat.getRegion(determineROI(img, roi));
    }
    else {
        return mat;
    }
};
//# sourceMappingURL=image-processor.class.js.map