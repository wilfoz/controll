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
    },
    mark: {
        type: String,
        require: true,
        enum: ['SIM', 'NÃO']
    }
})

module.exports = mongoose.model('Activity', activitySchema);