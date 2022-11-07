const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

const fieldValidations = (req, res, next) => {
  // If validationResult of "errors" is empty can create a new student, else we will see the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      if (typeof req.files !== 'undefined' && typeof req.files[0] !== 'undefined') {
        fs.unlinkSync(
          path.join(
            __dirname,
            '..',
            '..',
            'front',
            'src',
            'assets',
            'students',
            `${req.files[0].filename}`,
          ),
        );
      }
    } catch (error) {
      logger.error(error);
    }
    return res.status(400).json({
      message: '',
      data: {
        errors: errors.mapped(),
      },
    });
    // If we have an image will assign avatar
  }
  next();
};
module.exports = {
  fieldValidations,
};
