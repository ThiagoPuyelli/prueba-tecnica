import { NextFunction, Request, Response } from "express";
import { Schema } from "joi"; 

export default (schema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.json(err);
        }
    }
}