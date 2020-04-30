const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    name: String,
    office: String,
})

module.exports = mongoose.model('Leader', leaderSchema);