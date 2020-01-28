const express = require('express');
const router = express.Router();

const ctrlTowers = require('../controllers/towers');

router
    .route('/towers')
    .get(ctrlTowers.towersFindAll)
    .post(ctrlTowers.towerCreate);

router
    .route('/towers/:id')
    .get(ctrlTowers.towerReadOne)
    .put(ctrlTowers.towerUpdateOne)
    .delete(ctrlTowers.towerDeleteOne);

module.exports = router;
