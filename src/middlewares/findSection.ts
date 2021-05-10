import { Request, Response, NextFunction } from "express";

export default (param: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { course } = req.body;
        
        // Se verifica que la seccion existe
        const findSection = course.sections[parseInt(req.params[param]) - 1];
        if(!findSection) return res.json({error: "No existe la seccion"});

        req.body.sectionIndex = parseInt(req.params[param]) - 1;

        req.body.course = course;
        next();
    }
}