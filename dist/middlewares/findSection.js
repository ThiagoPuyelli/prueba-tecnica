"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (param) => {
    return (req, res, next) => {
        const { course } = req.body;
        // Se verifica que la seccion existe
        const findSection = course.sections[parseInt(req.params[param]) - 1];
        if (!findSection)
            return res.json({ error: "No existe la seccion" });
        req.body.sectionIndex = parseInt(req.params[param]) - 1;
        req.body.course = course;
        next();
    };
};
