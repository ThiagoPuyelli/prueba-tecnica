import multer from "multer";
import genID from "../methods/generateID";

export default (type: string) => {
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if(type == "image"){
                cb(null, __dirname + "/../uploads/images");
            } else {
                cb(null, __dirname + "/../uploads/files");
            }
        },
        filename: async (req, file, cb) => {
            const { originalname } = file;
    
            if(originalname){
                var fileExt: string|Array<string> = originalname.split(".");
                fileExt = fileExt[fileExt.length - 1];
                const id: string = await genID();
                cb(null, id + "." + fileExt);
            }
        } 
    })
    
    return multer({
        storage,
        fileFilter: (req, file, next) => {
            if(type == "image"){
                const image = file.mimetype.startsWith("image/");
                if(image){
                    next(null, true);
                } else {
                    next(null, false);
                }
            } else {
                next(null, true);
            }
        }
    })
    
}
