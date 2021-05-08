import { Schema, model } from "mongoose";

const courseSchema: Schema = new Schema({
    title: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true, maxLength: 800},
    sections: { type: [{
        title: {type: String, required: true},
        position: {type: Number, required: true},
        description: {type: String, required: true},
        parts: {type: [{
            title: {type: String, required: true},
            file: {type: String, required: true},
            position: {type: Number, required: true}
        }], default: []}
    }], default: []},
    image: { type: String, required: true},
    public_id: { type: String, required: true}
})

export default model("Course", courseSchema);