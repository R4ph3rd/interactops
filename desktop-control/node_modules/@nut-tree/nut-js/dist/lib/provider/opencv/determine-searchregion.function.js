"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function determineScaledSearchRegion(matchRequest) {
    const searchRegion = matchRequest.searchRegion;
    const scaleX = matchRequest.haystack.pixelDensity.scaleX || 1.0;
    const scaleY = matchRequest.haystack.pixelDensity.scaleY || 1.0;
    searchRegion.width *= scaleX;
    searchRegion.height *= scaleY;
    return searchRegion;
}
exports.determineScaledSearchRegion = determineScaledSearchRegion;
//# sourceMappingURL=determine-searchregion.function.js.map