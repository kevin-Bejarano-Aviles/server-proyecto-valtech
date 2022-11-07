const jwt = require('jsonwebtoken');
const { adminBy } = require('../helpers/findAdminBy');
const logger = require('../utils/logger');

const isAuthorized = async (req, res, next) => {
  let token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No token in request',
      data: '',
    });
  }
  try {
    token = token.split(' ');
    const { id } = jwt.verify(token[1], process.env.SECRET_SESSION);
    const admin = await adminBy('id', id);
    if (!admin) {
      logger.error('Error, access with non-existent user');
      return res.status(401).json({
        message: 'Invalid token user not found',
        data: '',
      });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token',
      data: '',
    });
    logger.error(error);
  }
};
module.exports = {
  isAuthorized,
};
