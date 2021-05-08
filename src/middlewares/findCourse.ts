import Course from "../models/Course";
import { Request, Response, NextFunction } from "express";

// Middleware para buscar curso

export default (param: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
        const course = await Course.findById(req.params[param]);
        if(!course) return res.json({error: "Error al encontrar curso"});
        
        req.body.course = course;

        next(null);
    }
}