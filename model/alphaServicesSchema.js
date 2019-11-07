const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-type-url');

const alphaServiceSchema = new Schema({
  company_id: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

});

const alphaMaster = mongoose.model('services', alphaServiceSchema);
module.exports = alphaMaster;
