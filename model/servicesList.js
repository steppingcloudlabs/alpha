const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
    service_name: {
        type: String,
        required: true
    },
    tenant_id: {
        type: Schema.Types.ObjectId,
        ref: 'master'
    }
});

const service = mongoose.model('services', serviceSchema);

module.exports = service;