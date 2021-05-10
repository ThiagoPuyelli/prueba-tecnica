import joi, { Schema } from "joi";

export var courseAndSectionJoi: Schema = joi.object({
        title: joi.string().required().max(30),
        description: joi.string().required().max(400)
});
 
export var partJoi: Schema = joi.object({
    title: joi.string().required().max(30)
})

