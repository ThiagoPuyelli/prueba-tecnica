import { Router } from "express";
const router = Router();
import { deleteSection, getSection, getSections, saveSection, updateSection } from "../controllers/section.controllers";
import findCourse from "../middlewares/findCourse";

router.put("/section/:id", findCourse("id"), saveSection);
router.get("/section/:id/:sectionID", findCourse("id"), getSection);
router.get("/section/:id", findCourse("id"), getSections);
router.put("/section/:id/:sectionID", findCourse("id"), updateSection);
router.delete("/section/:id/:position", findCourse("id"), deleteSection);

export default router;