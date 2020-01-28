const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
    date: {
        type: Date,
        'default': Date.now
    },
    leader: String,
    tower: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tower'
    },
    activity: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Activity'
    },
    status: {
      type: String, required: true,
        enum: ['EXECUTADO', 'PROGRAMADO', 'ANDAMENTO']
    }
});

mongoose.model('Production', productionSchema);