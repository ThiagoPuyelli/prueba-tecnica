import { Router } from "express";
import multer from "../middlewares/multer";
import findCourse from "../middlewares/findCourse";
import findSection from "../middlewares/findSection";
import { deletePart, getPart, getParts, savePart, updatePart } from "../controllers/part.controllers";
const router = Router();

router.put("/part/:courseID/:sectionID", 
        multer("file").single("file"),
        findCourse("courseID"), 
        findSection("sectionID"), 
        savePart
);

router.get("/part/:courseID/:sectionID",
        findCourse("courseID"),
        findSection("sectionID"),
        getParts
);

router.get("/part/:courseID/:sectionID/:partID",
        findCourse("courseID"),
        findSection("sectionID"),
        getPart
);

router.put("/part/:courseID/:sectionID/:position",
        multer("file").single("file"),
        findCourse("courseID"),
        findSection("sectionID"),
        updatePart
);

router.delete("/part/:courseID/:sectionID/:position",
        findCourse("courseID"),
        findSection("sectionID"),
        deletePart
);

export default router;