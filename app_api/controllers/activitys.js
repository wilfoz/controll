const mongoose = require('mongoose');
const Activity = mongoose.model('Activity');

const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const activitiesFindAll = Query.FindAll(Activity);
const activityReadOne = Query.ReadOne(Activity);
const activityDeleteOne = Query.DeleteOne(Activity);

const activityCreate = (req, res) => {
    const { name, unity, group, mark } = req.body;

    Activity
        .create({ name, unity, group, mark },
            (err, activity) => {
                CheckError.IfError(err, res, activity)
            });
};

const activityUpdateOne = (req, res) => {
    const { name, unity, group, mark } = req.body;
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

            activity.name = name;
            activity.unity = unity;
            activity.group = group;
            activity.mark = mark;

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