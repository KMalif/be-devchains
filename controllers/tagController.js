const { handleClientError, handleServerError } = require("../helpers/handleError");
const { addTagValidation } = require("../helpers/validationHelper");
const { Tag, sequelize } = require("../models");
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

exports.getPopularTags = async (req, res) => {
    try {
        const popularTags = await sequelize.query(
            `SELECT Tags.id AS tag_id, Tags.name AS tag_name, COUNT(*) AS tagCount
            FROM Question_tags
            INNER JOIN Tags ON Question_tags.tag_id = Tags.id
            GROUP BY tag_id, tag_name
            ORDER BY tagCount DESC
            LIMIT 10;`,
            { type: sequelize.QueryTypes.SELECT }
        );

        res.status(200).json({ message: "Success get popular tags", status: 200, data: popularTags });
    }catch (err) {
        console.log([fileName, "popular tag", "ERROR"], {
            message: { info: `${err}` },
        });
        return handleServerError(res)
    }
}

