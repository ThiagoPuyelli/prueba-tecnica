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
exports.deleteSection = exports.updateSection = exports.getSection = exports.getSections = exports.saveSection = void 0;
const Course_1 = __importDefault(require("../models/Course"));
var saveSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al agregar sección" });
    res.json(courseUpdate);
});
exports.saveSection = saveSection;
var getSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(req.body.course.sections); });
exports.getSections = getSections;
var getSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const section = req.body.course.sections[parseInt(req.params.position) - 1];
    if (!section)
        return res.json({ error: "La sección no existe" });
    res.json(section);
});
exports.getSection = getSection;
var updateSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course } = req.body;
    const { position } = req.params;
    // Se encuentra la seccion y se modifica
    for (let i in req.body) {
        if (i == "description" || i == "title") {
            req.body.course.sections[parseInt(position) - 1][i] = req.body[i];
        }
    }
    // Se almacena
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al modificar sección" });
    res.json(courseUpdate);
});
exports.updateSection = updateSection;
var deleteSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { course } = req.body;
    const { position } = req.params;
    // Eliminar la seccion
    course.sections.splice(parseInt(position) - 1, 1);
    // Si quedaron secciones y no elimino la ultima, acomodarle el numero de secciones
    if (course.sections.length > 0 && parseInt(position) != course.sections.length + 1) {
        for (let i = parseInt(position); i <= course.sections.length; i++) {
            course.sections[i - 1].position = i;
        }
    }
    // Se almacena el curso actualizado
    const courseUpdate = yield Course_1.default.findByIdAndUpdate(course._id, course, { new: true });
    if (!courseUpdate)
        return res.json({ error: "Error al eliminar sección" });
    res.json(courseUpdate);
});
exports.deleteSection = deleteSection;
