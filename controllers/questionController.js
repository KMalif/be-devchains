const { handleClientError, handleServerError } = require("../helpers/handleError");
const { addQuestionValidation } = require("../helpers/validationHelper");
const { Question } = require("../models");
const { Op } = require("sequelize");
const _ = require("lodash");
const fileName = "controller/questionController.js";
const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");

exports.addQuestion = async (req, res) => {
    let imageUrl;
    try{
        console.log(req.user.data, "<<payload token");
        const newData = req.body;
        addQuestionValidation(newData);
        
        if (req?.files?.image){
            imageUrl = await uploadToCloudinary(req.files.image[0], 'image');
        }

        const response = await Question.create({
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

exports.getAllQuestion = async (req, res) => {
    try {
        const response = await Question.findAll({
            where: {
                user_id: {
                    [Op.ne]: req.userId
                }
            }, 
            include: ['user']
        });
        res.status(200).json({ message: "success get questions", status: 200, data: response });

    }catch (err) {
        console.log([fileName, "get all question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};

exports.getUserQuestion = async (req, res) => {
    try {
        const response = await Question.findAll({
            where: {
                user_id: req.userId
            }
        });
        res.status(200).json({ message: "success get questions", status: 200, data: response });

    }catch (err) {
        console.log([fileName, "get all question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};

exports.searchQuestion = async (req, res) => {
    try {
        const response = await Question.findAll();
        res.status(200).json({ message: "success get questions", status: 200, data: response });

    }catch (err) {
        console.log([fileName, "get all question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};


exports.getDetailQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Question.findOne({
          where: { id: id },
        });

        if (_.isEmpty(response)) {
          return handleClientError(res, 404, `Question not found`);
        }
        res.status(200).json({ message: "Success",status: 200, data: response });
    }catch (err) {
        console.log([fileName, "get detail question", "ERROR"], {
            message: { info: `${err.message}` },
        });
        return handleServerError(res)
    }
};