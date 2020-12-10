"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The {@link Image} class represents generic image data
 */
class Image {
    /**
     * {@link Image} class constructor
     * @param width {@link Image} width in pixels
     * @param height {@link Image} height in pixels
     * @param data Generic {@link Image} data
     * @param channels Amount of {@link Image} channels
     * @param pixelDensity Object containing scale info to work with e.g. Retina display data where the reported display size and pixel size differ (Default: {scaleX: 1.0, scaleY: 1.0})
     */
    constructor(width, height, data, channels, pixelDensity = {
        scaleX: 1.0,
        scaleY: 1.0,
    }) {
        this.width = width;
        this.height = height;
        this.data = data;
        this.channels = channels;
        this.pixelDensity = pixelDensity;
        if (channels <= 0) {
            throw new Error("Channel <= 0");
        }
    }
    /**
     * {@link hasAlphaChannel} return true if an {@link Image} has an additional (fourth) alpha channel
     */
    get hasAlphaChannel() {
        return this.channels > 3;
    }
}
exports.Image = Image;
//# sourceMappingURL=image.class.js.map