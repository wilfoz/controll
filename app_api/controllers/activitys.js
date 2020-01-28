const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const activitiesFindAll = Query.FindAll(Activity);
const activityReadOne = Query.ReadOne(Activity);
const activityDeleteOne = Query.DeleteOne(Activity);

const activityCreate = (req, res) => {

    Activity
        .create({
            name: req.body.name,
            unity: req.body.unity,
            group: req.body.group
        },
            (err, activity) => {
                CheckError.IfError(err, res, activity)
            });
};

const activityUpdateOne = (req, res) => {
    if (!req.params.id) {
        return res
            .status(404)
            .json({
                "message": "Not found, id is required"
            });
    }
    Activity
        .findById(req.params.id)
        .exec((err, activity) => {

            CheckError.IfModelNull(err, res, activity);

            activity.name = req.body.name;
            activity.unity = req.body.unity;
            activity.group = req.body.group;

            activity.save((err, activity) => {
                CheckError.IfError(err, res, activity)
            });
        })
}

module.exports = {
    activityReadOne,
    activitiesFindAll,
    activityCreate,
    activityUpdateOne,
    activityDeleteOne
};