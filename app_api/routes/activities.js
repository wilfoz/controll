const express = require('express');
const router = express.Router();

const ctrlActivities = require('../controllers/activitys');

router
    .route('/activities')
    .get(ctrlActivities.activitiesFindAll)
    .post(ctrlActivities.activityCreate);

router
    .route('/activities/:id')
    .get(ctrlActivities.activityReadOne)
    .put(ctrlActivities.activityUpdateOne)
    .delete(ctrlActivities.activityDeleteOne);

module.exports = router;
