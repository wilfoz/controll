const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
    office: String,
})

mongoose.model('Leader', activitySchema);