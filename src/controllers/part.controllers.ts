import Course from "../models/Course";
import { request, Request, Response } from "express";
import fs from "fs";

export var savePart = async (req: Request, res: Response) => {
    const { course, sectionIndex, title } = req.body;

    // Juntar la informacion
    const part = {
        title,
        file: req.file.filename,
        position: course.sections[sectionIndex].parts.length + 1
    };
    
    // Asignarla a la seccion
    course.sections[sectionIndex].parts.push(part);


    // Guardarlos
    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al agregar parte"});

    res.json(courseUpdate);
    
}

export var getParts = async (req: Request, res: Response) => res.json(req.body.course.sections[req.body.sectionIndex].parts);

export var getPart = async (req: Request, res: Response) => {
    const { course, sectionIndex } = req.body;

    const part = course.sections[sectionIndex].parts.find((part: any) => part._id = req.params.partID);
    if(!part) return res.json({error: "La parte no existe"})

    res.json(part);
}

export var updatePart = async (req: Request, res: Response) => {
    const { course, sectionIndex } = req.body;
    const { position } = req.params;

    // Se encuentra la parte
    const part = course.sections[sectionIndex].parts[parseInt(position) - 1];

    // Se modifica los datos de la parte
    for(let i in req.body){
        course.sections[sectionIndex].parts[parseInt(position) - 1][i] = req.body[i];
    }

    // Si se cambia el archivo, tambien se cambia
    if(req.file){
        // Se elimina el archivo anterior
        fs.unlinkSync(__dirname + "/../uploads/files/" + part.file);

        // Se le asigna el filename del nuevo archivo
        course.sections[sectionIndex].parts[parseInt(position) - 1].file = req.file.filename;
    }

    // Se almacena

    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al agregar parte"});

    res.json(courseUpdate);
}

export var deletePart = async (req: Request, res: Response) => {
    const { course, sectionIndex } = req.body;
    const { position } = req.params;

    // Se elimina el archivo guardado
    const file = course.sections[sectionIndex].parts[parseInt(position) - 1].file;
    fs.unlinkSync(__dirname + "/../uploads/files/" + file);

    // Se elimina la parte del array
    course.sections[sectionIndex].parts.splice(parseInt(position) - 1, 1);    

    // Se acomodan las posiciones
    if(course.sections[sectionIndex].parts.length > 0 && course.sections[sectionIndex].parts.length + 1){
        for(let i = parseInt(position); i <= course.sections[sectionIndex].parts.length; i++){
            course.sections[sectionIndex].parts[i - 1].position = i;
        }
    }

    // Se guarda
    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al agregar parte"});

    res.json(courseUpdate);
}