const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-type-url');

const alphaServiceSchema = new Schema({
    company_id: {
        type: String,
        required: true,
    },
    company_oid: {
        type: String,
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
    service: [{
        type: String,
        required: true,
    }],
    service_status: {
        type: Boolean,
        required: true,
    },
    user_role: {
        type: Schema.Types.ObjectId,
        required: true,
    }

});

const alphaMaster = mongoose.model('servicegod', alphaServiceSchema);
module.exports = alphaMaster;