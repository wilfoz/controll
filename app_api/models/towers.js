const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    coords: {
        type: {type: String},
        coordinates: [Number]
    },
    forward: Number,
    weight: Number,
    height: Number,
    released: { type: String, required: true,
        enum: ['LIBERADO', 'EMBARGO', 'ARQUEOLOGIA'] }
})

towerSchema.index({coords: '2dsphere'});
module.exports = mongoose.model('Tower', towerSchema);