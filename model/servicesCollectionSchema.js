const mongoose = require('mongoose');

const { Schema } = mongoose;
require('mongoose-type-url');

const servicesCollectionSchema = new Schema({
    service_name: {
        type: String,
        unique: true,
        required: true,
    },
    collection_name: {
        type: [{
            type: String
        }],
        required: true,
    },
});

const servicesCollection = mongoose.model('servicesCollectionSchema', servicesCollectionSchema);
module.exports = servicesCollection;