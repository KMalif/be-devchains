const Joi = require("joi");
const Boom = require("boom");

const addTagValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
    });
    
    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    }
};

const addQuestionValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(), 
        description: Joi.string().required(),
        image_url: Joi.string().optional(),
        user_id: Joi.number().required(),
    });
    
    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    }
};

const addAnswerValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().optional(), 
        description: Joi.string().required(),
        image_url: Joi.string().optional(),
        question_id: Joi.number().required(),
        user_id: Joi.number().required(),
    });
    
    if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
    }
};



module.exports = {
    addTagValidation,
    addQuestionValidation,
    addAnswerValidation
}
