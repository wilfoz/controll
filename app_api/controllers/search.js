const mongoose = require('mongoose');
const moment = require('moment');

const Prod = mongoose.model('Production');

const productionsFind = (req, res) => {

    let start = moment(req.query.start, 'DD/MM/YYYY', true).format();
    let end = moment(req.query.end, 'DD/MM/YYYY', true).add( 3, 'hours' ).format();

    Prod
        .find({
            date: { $gte: start, $lte: end },
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