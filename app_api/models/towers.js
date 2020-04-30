const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    project: Number,
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
    height: Number,
    foundation_MC: String,
    foundation_A: String,
    foundation_B: String,
    foundation_C: String,
    foundation_D: String,

    released: { type: String, required: true,
        enum: ['LIBERADO', 'EMBARGO', 'ARQUEOLOGIA'] },
    
})

towerSchema.index({coords: '2dsphere'});
module.exports = mongoose.model('Tower', towerSchema);