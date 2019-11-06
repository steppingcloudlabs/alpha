const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-type-url');

const alphaMasterSchema = new Schema({
  company_name: {
    type: String,
    unique: true,
  },
  company_id: {
    type: String,
    unique: true,
  },
  client_id: {
    type: String,
    unique: true,
  },
  idp_url: {
    type: mongoose.SchemaTypes.Url,
  },
  token_url: {
    type: mongoose.SchemaTypes.Url,
  },
  private_key: {
    type: String,
    unique: true,
  },
  grant_type: {
    type: String,
  },
  company_admin_contact_email: {
    type: String,
  },
  master_username: {
    type: String,
  },
  master_password: {
    type: String,
  },
});

const alphaMaster = mongoose.model('master', alphaMasterSchema);
module.exports = alphaMaster;
