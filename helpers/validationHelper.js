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

module.exports = {
    addTagValidation,

}
