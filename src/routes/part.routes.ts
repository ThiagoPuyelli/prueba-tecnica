import { Router } from "express";
import multer from "../middlewares/multer";
import findCourse from "../middlewares/findCourse";
import findSection from "../middlewares/findSection";
import { deletePart, getPart, getParts, savePart, updatePart } from "../controllers/part.controllers";
import { partJoi } from "../joi/course.joi";
import validateData from "../middlewares/validateData";
const router = Router();

router.put("/part/:courseID/:positionSection", 
        multer("file").single("file"),
        validateData(partJoi),
        findCourse("courseID"), 
        findSection("positionSection"), 
        savePart
);

router.get("/part/:courseID/:positionSection",
        findCourse("courseID"),
        findSection("positionSection"),
        getParts
);

router.get("/part/:courseID/:positionSection/:position",
        findCourse("courseID"),
        findSection("positionSection"),
        getPart
);

router.put("/part/:courseID/:positionSection/:position",
        multer("file").single("file"),
        validateData(partJoi),
        findCourse("courseID"),
        findSection("positionSection"),
        updatePart
);

router.delete("/part/:courseID/:positionSection/:position",
        findCourse("courseID"),
        findSection("positionSection"),
        deletePart
);

export default router;