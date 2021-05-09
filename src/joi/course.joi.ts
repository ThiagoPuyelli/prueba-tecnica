import joi from "joi";

export default joi.object({
    title: joi.string().required().max(40)
})