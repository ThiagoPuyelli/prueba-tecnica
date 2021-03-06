"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const app_1 = __importDefault(require("./app"));
// DATABASE
require("./database");
// CLOUDINARY
const cloudinary_1 = __importDefault(require("./cloudinary"));
cloudinary_1.default();
app_1.default().listen(app_1.default().get("port"), () => console.log("Server on port", app_1.default().get("port")));
