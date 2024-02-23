const { handleClientError, handleServerError } = require("../helpers/handleError");
const { addTagValidation } = require("../helpers/validationHelper");
const { Tag } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const fileName = "controller/tagController.js";

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

        const response = await Tag.create(newData);
        res.status(201).json({ message: "New tag created", status: 201 });

    }catch (err) {
        console.log([fileName, "POST Create Tag", "ERROR"], {
            message: { info: `${err}` },
        });
        return handleServerError(res)
    }
};

exports.getTagByName = async (req, res) => {
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
        console.log([fileName, "search Tag by name", "ERROR"], {
            message: { info: `${err}` },
        });
        return handleServerError(res)
    }
};

exports.getAllTags = async (req, res) => {
    try{
        const tags = await Tag.findAll();
        res.status(200).json({ message: "Success get all tags", status: 200, data: tags });
    }catch (err) {
        console.log([fileName, "search Tag by name", "ERROR"], {
            message: { info: `${err}` },
        });
        return handleServerError(res)
    }
};

