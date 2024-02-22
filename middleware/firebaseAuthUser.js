const jwt = require("jsonwebtoken");
const { handleClientError, handleServerError } = require("../helpers/handleError");
const admin = require("../config/firebase-config");

const firebaseAuthUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return handleClientError(res, 401, "No token provided");
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    req.userId = decodedToken.user_id;
    next();
  } catch (error) {
    console.log(error.message);
    return handleServerError(res);
  }
};

module.exports = {
    firebaseAuthUser,
};
