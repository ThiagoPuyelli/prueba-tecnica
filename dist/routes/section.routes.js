"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const section_controllers_1 = require("../controllers/section.controllers");
const findCourse_1 = __importDefault(require("../middlewares/findCourse"));
router.put("/section/:id", findCourse_1.default("id"), section_controllers_1.saveSection);
router.get("/section/:id/:sectionID", findCourse_1.default("id"), section_controllers_1.getSection);
router.get("/section/:id", findCourse_1.default("id"), section_controllers_1.getSections);
router.put("/section/:id/:sectionID", findCourse_1.default("id"), section_controllers_1.updateSection);
router.delete("/section/:id/:position", findCourse_1.default("id"), section_controllers_1.deleteSection);
exports.default = router;
