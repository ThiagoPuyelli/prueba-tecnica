import { Router } from "express";
import { deleteCourse, getCourse, getCourses, saveCourse, updateCourse } from "../controllers/course.controllers";
import multer from "../middlewares/multer";
import validateData from "../middlewares/validateData";
import { courseAndSectionJoi } from "../joi/course.joi";
const router = Router();

router.post("/course", multer("image").single("image"), validateData(courseAndSectionJoi), saveCourse);
router.get("/course", getCourses);
router.get("/course/:id", getCourse);
router.put("/course/:id", multer("image").single("image"), validateData(courseAndSectionJoi), updateCourse);
router.delete("/course/:id", deleteCourse);

export default router;