import mongoose from "mongoose";

const uri: string|undefined = process.env.MONGODB_URI;

if(uri){
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(connect => console.log("Connect to a database"))
    .catch(err => console.log(err))
}