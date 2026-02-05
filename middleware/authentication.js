const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new CustomError.UnauthorizedError("Please provide a valid token");
  }
  const acessToken = req.headers.authorization.split(" ")[1];
  if (!acessToken) {
    throw new CustomError.UnauthorizedError(
      "Not authorized Please Login again"
    );
  }

  try {
    if (acessToken) {
      const payload = jwt.verify(acessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload;
      return next();
    }
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      `Authentication Invalid ${error}`
    );
  }
};

const authenticateAnalyzer = async (req, res, next) => {
  try {
    const acessToken = req.headers.authorization.split(" ")[1];
    if (!acessToken) {
      throw new CustomError.UnauthorizedError(
        "Not authorized Please Login again"
      );
    }

    if (acessToken) {
      const payload = jwt.verify(acessToken, process.env.PRIVATE_KEY);
      req.analyzerInfo = payload;
      return next();
    }
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      `Authentication Invalid ${error}`
    );
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  authenticateAnalyzer,
};
