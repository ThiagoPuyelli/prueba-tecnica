import { config } from "dotenv";
config();
import app from "./app";

// DATABASE
import "./database";

// CLOUDINARY
import cloud from "./cloudinary";
cloud();

app().listen(app().get("port"), () => console.log("Server on port", app().get("port")))