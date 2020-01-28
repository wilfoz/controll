const express = require('express');
const router = express.Router();

const ctrlProductions = require('../controllers/productions');
const ctrlSearch = require('../controllers/search');

router
    .route('/productions')
    .get(ctrlProductions.productionsFindAll)
    .post(ctrlProductions.productionCreate);

router
    .route('/production')
    .get(ctrlSearch.productionsFind);

router
    .route('/productions/:id')
    .get(ctrlProductions.productionReadOne)
    .put(ctrlProductions.productionUpdateOne)
    .delete(ctrlProductions.productionDeleteOne);

module.exports = router;
