"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partJoi = exports.courseAndSectionJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.courseAndSectionJoi = joi_1.default.object({
    title: joi_1.default.string().required().max(30),
    description: joi_1.default.string().required().max(400)
});
exports.partJoi = joi_1.default.object({
    title: joi_1.default.string().required().max(30)
});
