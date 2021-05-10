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
exports.deletePart = exports.updatePart = exports.getPart = exports.getParts = exports.savePart = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const fs_1 = __importDefault(require("fs"));
var savePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al agregar parte" });
    res.json(courseUpdate);
});
exports.savePart = savePart;
var getParts = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(req.body.course.sections[req.body.sectionIndex].parts); });
exports.getParts = getParts;
var getPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, sectionIndex } = req.body;
    const part = course.sections[sectionIndex].parts[parseInt(req.params.position) - 1];
    if (!part)
        return res.json({ error: "La parte no existe" });
    res.json(part);
});
exports.getPart = getPart;
var updatePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, sectionIndex } = req.body;
    const { position } = req.params;
    // Se encuentra la parte
    const part = course.sections[sectionIndex].parts[parseInt(position) - 1];
    // Se modifica los datos de la parte
    for (let i in req.body) {
        course.sections[sectionIndex].parts[parseInt(position) - 1][i] = req.body[i];
    }
    // Si se cambia el archivo, tambien se cambia
    if (req.file) {
        // Se elimina el archivo anterior
        fs_1.default.unlinkSync(__dirname + "/../uploads/files/" + part.file);
        // Se le asigna el filename del nuevo archivo
        course.sections[sectionIndex].parts[parseInt(position) - 1].file = req.file.filename;
    }
    // Se almacena
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al agregar parte" });
    res.json(courseUpdate);
});
exports.updatePart = updatePart;
var deletePart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course, sectionIndex } = req.body;
    const { position } = req.params;
    // Se elimina el archivo guardado
    const file = course.sections[sectionIndex].parts[parseInt(position) - 1].file;
    fs_1.default.unlinkSync(__dirname + "/../uploads/files/" + file);
    // Se elimina la parte del array
    course.sections[sectionIndex].parts.splice(parseInt(position) - 1, 1);
    // Se acomodan las posiciones
    if (course.sections[sectionIndex].parts.length > 0 && course.sections[sectionIndex].parts.length + 1) {
        for (let i = parseInt(position); i <= course.sections[sectionIndex].parts.length; i++) {
            course.sections[sectionIndex].parts[i - 1].position = i;
        }
    }
    // Se guarda
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al agregar parte" });
    res.json(courseUpdate);
});
exports.deletePart = deletePart;
