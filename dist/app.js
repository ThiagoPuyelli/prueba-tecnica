"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const section_routes_1 = __importDefault(require("./routes/section.routes"));
const part_routes_1 = __importDefault(require("./routes/part.routes"));
const app = express_1.default();
exports.default = () => {
    // PORT
    app.set("port", process.env.PORT || 4000);
    // MIDDLEWARES
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // CORS 
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    // ROUTES
    app.use(course_routes_1.default);
    app.use(section_routes_1.default);
    app.use(part_routes_1.default);
    // RETURN
    return app;
};
