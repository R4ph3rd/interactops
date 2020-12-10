"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const file_type_enum_1 = require("./file-type.enum");
/**
 * {@link generateOutputPath} is used to assemble full file path from a filename and various parameters
 * @param filename The base filename
 * @param params A config object which allows to configure {@link FileType}, base path, filename prefix and filename postfix
 */
exports.generateOutputPath = (filename, params) => {
    const name = path_1.parse(filename).name;
    const imageType = (params && params.type) ? params.type : file_type_enum_1.FileType.PNG;
    const path = (params && params.path) ? params.path : process_1.cwd();
    const prefix = (params && params.prefix) ? params.prefix : "";
    const postfix = (params && params.postfix) ? params.postfix : "";
    return path_1.join(path, `${prefix}${name}${postfix}${imageType}`);
};
//# sourceMappingURL=generate-output-path.function.js.map