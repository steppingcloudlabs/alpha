const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-type-url');

const alphaMasterSchema = new Schema({
    company_name: {
        type: String,
    },
    company_id: {
        type: String,
        unique: true,
    },
    client_id: {
        type: String,
    },
    idp_url: {
        type: mongoose.SchemaTypes.Url,
    },
    token_url: {
        type: mongoose.SchemaTypes.Url,
    },
    private_key: {
        type: String,
    },
    grant_type: {
        type: String,
    },
    company_admin_contact_email: {
        type: String,
    },
    db_name: {
        type: String,
    },
    master_username: {
        type: String,
    },
    master_password: {
        type: String,
    },
    service_name: [{
        type: Schema.Types.ObjectId,
        ref: 'services'
    }]
});

const alphaMaster = mongoose.model('master', alphaMasterSchema);
module.exports = alphaMaster;