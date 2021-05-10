import Course from "../models/Course";
import { Request, Response } from "express";

export var saveSection = async (req: Request, res: Response) => {
    const { title, description, course } = req.body;

    // Recopilacion de datos
    const section = {
        title,
        description,
        parts: [],
        position: course.sections.length + 1
    };

    // Asignarlos
    course.sections.push(section);

    // Guardarlos
    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al agregar sección"});

    res.json(courseUpdate);

}

export var getSections = async (req: Request, res: Response) => res.json(req.body.course.sections);

export var getSection = async (req: Request, res: Response) => {
    
    const section = req.body.course.sections[parseInt(req.params.position) - 1];
    if(!section) return res.json({error: "La sección no existe"});

    res.json(section)
}

export var updateSection = async (req: Request, res: Response) => {
    const { course } = req.body;
    const { position } = req.params;

    // Se encuentra la seccion y se modifica
    for(let i in req.body){
        if(i == "description" || i == "title"){
            req.body.course.sections[parseInt(position) - 1][i] = req.body[i]
        }
    }

    // Se almacena
    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al modificar sección"});

    res.json(courseUpdate);

}

export var deleteSection = async (req: Request, res: Response) => {
    const { course } = req.body;
    const { position } = req.params;

    // Eliminar la seccion
    course.sections.splice(parseInt(position) - 1, 1);

    // Si quedaron secciones y no elimino la ultima, acomodarle el numero de secciones
    if(course.sections.length > 0 && parseInt(position) != course.sections.length + 1){
        for(let i = parseInt(position); i <= course.sections.length; i++){
            course.sections[i - 1].position = i;
        }
    }

    // Se almacena el curso actualizado

    const courseUpdate = await Course.findByIdAndUpdate(course._id, course, {new: true});
    if(!courseUpdate) return res.json({error: "Error al eliminar sección"});

    res.json(courseUpdate);
}