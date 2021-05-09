import { Request, Response, NextFunction } from "express";

export default (param: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { course } = req.body;
        
        // Se encuentra el indice de la seccion
        for(let i in course.sections){
            if(course.sections[i]._id == req.params[param]){
                req.body.sectionIndex = i;
            }
        }

        if(!req.body.sectionIndex) return res.json({error: "La seccion no existe"});

        req.body.course = course;
        next();
    }
}