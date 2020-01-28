const mongoose = require('mongoose');
const moment = require('moment');

const Prod = mongoose.model('Production');

const productionsFind = (req, res) => {

    const { date } = req.query;
    const newDate = moment(date).format("L");

    console.log(newDate);

    Prod
        .find({
            date: {
                $in: newDate
            },
        })
        .populate({ path: 'tower' })
        .populate({ path: 'activity' })
        .exec((err, production) => {
            if (!production) {
                return res
                    .status(404)
                    .json({ "message": "search not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(production);
            }
        });

}

module.exports = {
    productionsFind,
};