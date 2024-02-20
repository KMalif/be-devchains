const { handleClientError, handleServerError } = require("../helpers/handleError");
const { addTagValidation } = require("../helpers/validationHelper");
const { Tag } = require("../models");
const { Op } = require("sequelize");

exports.addTags = async (req, res) => {
    try {
        const newData = req.body;
        addTagValidation(newData);

        const existingTag = await Tag.findOne({
            where : {
                name: newData?.name
            }
        })

        if (!_.isEmpty(existingTag)) {
            throw Boom.badRequest(`Tag already exist!`);
        }

        const response = await Tag.create({name, description});
        res.status(201).json({ message: "New tag created", status: 201 });

    }catch (err) {
        return handleServerError(res)
    }
};

exports.getTagByName = (req, res) => {
    try {
        const reqBody = req.body;
        
        const response = Tag.findAll({
            where: {
                name: {
                [Op.like]: `%${reqBody?.name}%`
                }
            }
        });

        res.status(200).json({ message: "Success get tags", status: 200, data: response });
    }catch (err) {
        return handleServerError(res)
    }
};

