"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourse = exports.getCourses = exports.saveCourse = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
var saveCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new Course_1.default();
    // Verificacion de imagen
    if (!req.file)
        return res.json({ error: "La imagen no es válida" });
    // Subida de imagen
    const imageUpload = yield cloudinary_1.v2.uploader.upload(__dirname + "/../uploads/images/" + req.file.filename);
    if (!imageUpload)
        return res.json({ error: "Error al guardar la imagen" });
    const { url, public_id } = imageUpload;
    course.image = url;
    course.public_id = public_id;
    // Eliminar imagen de forma local
    fs_1.default.unlinkSync(__dirname + "/../uploads/images/" + req.file.filename);
    // Asignar titulo y descripcion
    course.title = req.body.title;
    course.description = req.body.description;
    // Guardarlo
    const courseSave = yield course.save();
    if (!courseSave)
        return res.json("Error al almacenar curso");
    return res.json(courseSave);
});
exports.saveCourse = saveCourse;
var getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield Course_1.default.find()); });
exports.getCourses = getCourses;
var getCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id || req.params.id == "")
        res.json({ error: "El id no es válido" });
    res.json(yield Course_1.default.findById(req.params.id));
});
exports.getCourse = getCourse;
var updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_1.default.findById(req.params.id);
    if (!course)
        res.json({ error: "El curso no existe" });
    for (let i in req.body) {
        course[i] = req.body[i];
    }
    if (req.file) {
        // Si existe imagen, subirla a cloudinary
        const imageUpload = yield cloudinary_1.v2.uploader.upload(__dirname + "/../uploads/images/" + req.file.filename);
        if (!imageUpload)
            return res.json({ error: "Error al guardar la imagen" });
        // Eliminar la imagen de forma local
        fs_1.default.unlinkSync(__dirname + "/../uploads/images/" + req.file.filename);
        // y eliminar la anterior
        const imageDestroy = yield cloudinary_1.v2.uploader.destroy(course.public_id);
        if (!imageDestroy)
            return res.json({ error: "Error al eliminar imagen anterior" });
        const { url, public_id } = imageUpload;
        course.image = url;
        course.public_id = public_id;
    }
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al modificar el curso" });
    res.json(courseUpdate);
});
exports.updateCourse = updateCourse;
var deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course_1.default.findById(req.params.id);
    if (!course)
        return res.json({ error: "El curso no existe" });
    // Eliminar imagen de cloudinary
    const imageDelete = yield cloudinary_1.v2.uploader.destroy(course.public_id);
    if (!imageDelete)
        return res.json({ error: "Error al eliminar imagen de cloudinary" });
    // Luego eliminar el curso
    const courseDelete = yield Course_1.default.findByIdAndRemove(course._id);
    if (!courseDelete)
        return res.json({ error: "Error al eliminar el curso" });
    res.json("Curso eliminado con éxito");
});
exports.deleteCourse = deleteCourse;
