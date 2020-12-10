/**
 * The {@link Image} class represents generic image data
 */
export declare class Image {
    readonly width: number;
    readonly height: number;
    readonly data: any;
    readonly channels: number;
    readonly pixelDensity: {
        scaleX: number;
        scaleY: number;
    };
    /**
     * {@link Image} class constructor
     * @param width {@link Image} width in pixels
     * @param height {@link Image} height in pixels
     * @param data Generic {@link Image} data
     * @param channels Amount of {@link Image} channels
     * @param pixelDensity Object containing scale info to work with e.g. Retina display data where the reported display size and pixel size differ (Default: {scaleX: 1.0, scaleY: 1.0})
     */
    constructor(width: number, height: number, data: any, channels: number, pixelDensity?: {
        scaleX: number;
        scaleY: number;
    });
    /**
     * {@link hasAlphaChannel} return true if an {@link Image} has an additional (fourth) alpha channel
     */
    get hasAlphaChannel(): boolean;
}
//# sourceMappingURL=image.class.d.ts.map