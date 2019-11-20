const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
    service_name: {
        type: String,
    },
    tenant_id: {
        type: Schema.Types.ObjectId
    },
    company_name: {
        type: String
    }
});

const service = mongoose.model('services', serviceSchema);

module.exports = service;