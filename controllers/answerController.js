const { handleClientError, handleServerError } = require("../helpers/handleError");
const { addAnswerValidation } = require("../helpers/validationHelper");
const { Answer } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const fileName = "controller/answerController.js";
const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.addAnswer = async (req, res) => {
    try {
        const newData = req.body;
        addAnswerValidation(newData);

        if (req?.files?.image){
            imageUrl = await uploadToCloudinary(req.files.image[0], 'image');
        }

        const response = await Answer.create({
            ...newData,
            user_id: req.userId,
            image_url: imageUrl?.url
        });

        res.status(201).json({ message: "New question created", status: 201, data: response });

    }catch (err) {
        console.log([fileName, "POST Create question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};

exports.getUserAnswers = async (req, res) => {
    try {
        const response = await Answer.findAll({
            where: {
                user_id: 1
            }
        })
    }catch (err) {
        console.log([fileName, "POST Create question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};

