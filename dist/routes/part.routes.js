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
const router = express_1.Router();
router.put("/part/:courseID/:sectionID", multer_1.default("file").single("file"), findCourse_1.default("courseID"), findSection_1.default("sectionID"), part_controllers_1.savePart);
router.get("/part/:courseID/:sectionID", findCourse_1.default("courseID"), findSection_1.default("sectionID"), part_controllers_1.getParts);
router.get("/part/:courseID/:sectionID/:partID", findCourse_1.default("courseID"), findSection_1.default("sectionID"), part_controllers_1.getPart);
router.put("/part/:courseID/:sectionID/:position", multer_1.default("file").single("file"), findCourse_1.default("courseID"), findSection_1.default("sectionID"), part_controllers_1.updatePart);
router.delete("/part/:courseID/:sectionID/:position", findCourse_1.default("courseID"), findSection_1.default("sectionID"), part_controllers_1.deletePart);
exports.default = router;
