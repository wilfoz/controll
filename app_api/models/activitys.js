const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
    unity: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true,
        enum: ['CIVIL', 'MONTAGEM', 'LANÇAMENTO', 'COMISSIONAMENTO']
    }
})

mongoose.model('Activity', activitySchema);