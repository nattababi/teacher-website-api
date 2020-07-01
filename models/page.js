const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Page = mongoose.model('Page', new mongoose.Schema({
  page: {
    type: String,
    required: true,
    minlength: 2
  },
  text: {
    type: String,
    required: true,
    minlength: 5
  }
}));

function validatePage(page) {
  const schema = Joi.object({
    page: Joi.string().min(2).required(),
    text: Joi.string().min(5).required()
  });

  return schema.validate(page);
}

exports.Page = Page; 
exports.validate = validatePage;