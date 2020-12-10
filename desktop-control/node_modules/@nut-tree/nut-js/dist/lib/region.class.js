"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Region {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
    static scaled(region, scaleX = 1.0, scaleY = 1.0) {
        if (scaleX === 0 || scaleY === 0) {
            throw new Error(`Scaling to 0. Please check parameters: scaleX: ${scaleX}, scaleY: ${scaleY}`);
        }
        return new Region(region.left * scaleX, region.top * scaleY, region.width * scaleX, region.height * scaleY);
    }
    area() {
        return this.width * this.height;
    }
    toString() {
        return `(${this.left}, ${this.top}, ${this.left + this.width}, ${this.top +
            this.height})`;
    }
}
exports.Region = Region;
//# sourceMappingURL=region.class.js.map