import express, { Request, Response, NextFunction, Express } from "express";
import morgan from "morgan";
import courseRoutes from "./routes/course.routes";
import sectionRoutes from "./routes/section.routes";
const app = express();

export default (): Express => {
    
    // PORT
    app.set("port", process.env.PORT || 4000);

    // MIDDLEWARES
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // CORS 
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    // ROUTES

    app.use(courseRoutes);
    app.use(sectionRoutes);

    // RETURN
    
    return app;
}