const express = require('express');
const router = express.Router();

const ctrlLeaders = require('../controllers/leaders');

router
    .route('/leaders')
    .get(ctrlLeaders.leadersFindAll)
    .post(ctrlLeaders.leaderCreate);

router
    .route('/leaders/:id')
    .get(ctrlLeaders.leaderReadOne)
    .put(ctrlLeaders.leaderUpdateOne)
    .delete(ctrlLeaders.leaderDeleteOne);

module.exports = router;
