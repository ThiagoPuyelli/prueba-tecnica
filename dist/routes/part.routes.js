"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../middlewares/multer"));
const findCourse_1 = __importDefault(require("../middlewares/findCourse"));
const findSection_1 = __importDefault(require("../middlewares/findSection"));
const part_controllers_1 = require("../controllers/part.controllers");
const course_joi_1 = require("../joi/course.joi");
const validateData_1 = __importDefault(require("../middlewares/validateData"));
const router = express_1.Router();
router.put("/part/:courseID/:positionSection", multer_1.default("file").single("file"), validateData_1.default(course_joi_1.partJoi), findCourse_1.default("courseID"), findSection_1.default("positionSection"), part_controllers_1.savePart);
router.get("/part/:courseID/:positionSection", findCourse_1.default("courseID"), findSection_1.default("positionSection"), part_controllers_1.getParts);
router.get("/part/:courseID/:positionSection/:position", findCourse_1.default("courseID"), findSection_1.default("positionSection"), part_controllers_1.getPart);
router.put("/part/:courseID/:positionSection/:position", multer_1.default("file").single("file"), validateData_1.default(course_joi_1.partJoi), findCourse_1.default("courseID"), findSection_1.default("positionSection"), part_controllers_1.updatePart);
router.delete("/part/:courseID/:positionSection/:position", findCourse_1.default("courseID"), findSection_1.default("positionSection"), part_controllers_1.deletePart);
exports.default = router;
