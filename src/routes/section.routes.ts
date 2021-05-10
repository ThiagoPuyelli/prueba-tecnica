import { Router } from "express";
const router = Router();
import { deleteSection, getSection, getSections, saveSection, updateSection } from "../controllers/section.controllers";
import { courseAndSectionJoi } from "../joi/course.joi";
import validateData from "../middlewares/validateData";
import findCourse from "../middlewares/findCourse";

router.put("/section/:id", validateData(courseAndSectionJoi), findCourse("id"), saveSection);
router.get("/section/:id/:position", findCourse("id"), getSection);
router.get("/section/:id", findCourse("id"), getSections);
router.put("/section/:id/:position", validateData(courseAndSectionJoi), findCourse("id"), updateSection);
router.delete("/section/:id/:position", findCourse("id"), deleteSection);

export default router;