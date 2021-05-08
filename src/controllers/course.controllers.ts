import Course from "../models/Course";
import { Request, Response } from "express";
import { v2 } from "cloudinary";
import fs from "fs";

export var saveCourse = async (req: Request, res: Response) => {
    const course: any = new Course();

    // Verificacion de imagen
    if(!req.file) return res.json({error: "La imagen no es válida"});

    // Subida de imagen
    const imageUpload = await v2.uploader.upload(__dirname + "/../uploads/images/" + req.file.filename);
    
    if(!imageUpload) return res.json({error: "Error al guardar la imagen"});

    const { url, public_id } = imageUpload;
    course.image = url;
    course.public_id = public_id;

    // Eliminar imagen de forma local
    fs.unlinkSync(__dirname + "/../uploads/images/" + req.file.filename);

    // Asignar titulo y descripcion
    course.title = req.body.title;
    course.description = req.body.description;

    // Guardarlo
    const courseSave = await course.save();
    if(!courseSave) return res.json("Error al almacenar curso");

    return res.json(courseSave);

}

export var getCourses = async (req: Request, res: Response) => res.json(await Course.find());

export var getCourse = async (req: Request, res: Response) => {

    if(!req.params.id || req.params.id == "") res.json({error: "El id no es válido"});
    
    res.json(await Course.findById(req.params.id));
}

export var updateCourse = async (req: Request, res: Response) => {
    const course: any = await Course.findById(req.params.id);
    if(!course) res.json({error: "El curso no existe"});

    for(let i in req.body){
        course[i] = req.body[i];
    }

    if(req.file){
        // Si existe imagen, subirla a cloudinary
        const imageUpload = await v2.uploader.upload(__dirname + "/../uploads/images/" + req.file.filename);
        if(!imageUpload) return res.json({error: "Error al guardar la imagen"});

        // Eliminar la imagen de forma local
        fs.unlinkSync(__dirname + "/../uploads/images/" + req.file.filename);
        
        // y eliminar la anterior
        const imageDestroy = await v2.uploader.destroy(course.public_id); 
        if(!imageDestroy) return res.json({error: "Error al eliminar imagen anterior"});

        const { url, public_id } = imageUpload;
        course.image = url;
        course.public_id = public_id;
    }

    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});

    if(!courseUpdate) return res.json({error: "Error al modificar el curso"});

    res.json(courseUpdate);
}

export var deleteCourse = async (req: Request, res: Response) => {
    const course: any = await Course.findById(req.params.id);
    if(!course) return res.json({error: "El curso no existe"});

    // Eliminar imagen de cloudinary
    const imageDelete = await v2.uploader.destroy(course.public_id);
    if(!imageDelete) return res.json({error: "Error al eliminar imagen de cloudinary"});
    
    // Luego eliminar el curso
    const courseDelete = await Course.findByIdAndRemove(course._id);
    if(!courseDelete) return res.json({error: "Error al eliminar el curso"});
    res.json("Curso eliminado con éxito")
}