"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controllers_1 = require("../controllers/course.controllers");
const multer_1 = __importDefault(require("../middlewares/multer"));
const router = express_1.Router();
router.post("/course", multer_1.default("image").single("image"), course_controllers_1.saveCourse);
router.get("/course", course_controllers_1.getCourses);
router.get("/course/:id", course_controllers_1.getCourse);
router.put("/course/:id", multer_1.default("image").single("image"), course_controllers_1.updateCourse);
router.delete("/course/:id", course_controllers_1.deleteCourse);
exports.default = router;
