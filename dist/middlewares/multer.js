"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const generateID_1 = __importDefault(require("../methods/generateID"));
exports.default = (type) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            if (type == "image") {
                cb(null, __dirname + "/../uploads/images");
            }
            else {
                cb(null, __dirname + "/../uploads/files");
            }
        },
        filename: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
            const { originalname } = file;
            if (originalname) {
                var fileExt = originalname.split(".");
                fileExt = fileExt[fileExt.length - 1];
                const id = yield generateID_1.default();
                cb(null, id + "." + fileExt);
            }
        })
    });
    return multer_1.default({
        storage,
        fileFilter: (req, file, next) => {
            if (type == "image") {
                const image = file.mimetype.startsWith("image/");
                if (image) {
                    next(null, true);
                }
                else {
                    next(null, false);
                }
            }
            else {
                next(null, true);
            }
        }
    });
};
