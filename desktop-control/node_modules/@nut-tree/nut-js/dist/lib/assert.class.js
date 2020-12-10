"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Assert {
    constructor(screen) {
        this.screen = screen;
    }
    async isVisible(pathToNeedle, searchRegion, confidence) {
        try {
            await this.screen.find(pathToNeedle, { searchRegion, confidence });
        }
        catch (err) {
            if (searchRegion !== undefined) {
                throw new Error(`Element '${pathToNeedle}' not found in region ${searchRegion.toString()}`);
            }
            else {
                throw new Error(`Element '${pathToNeedle}' not found`);
            }
        }
    }
    async notVisible(pathToNeedle, searchRegion, confidence) {
        try {
            await this.screen.find(pathToNeedle, { searchRegion, confidence });
        }
        catch (err) {
            return;
        }
        throw new Error(`'${pathToNeedle}' is visible`);
    }
}
exports.Assert = Assert;
//# sourceMappingURL=assert.class.js.map