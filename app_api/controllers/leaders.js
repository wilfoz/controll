const mongoose = require('mongoose');
const Leader = mongoose.model('Leader');

const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const leadersFindAll = Query.FindAll(Leader);
const leaderReadOne = Query.ReadOne(Leader);
const leaderDeleteOne = Query.DeleteOne(Leader);

const leaderCreate = (req, res) => {

    Leader
        .create({
            name: req.body.name,
            office: req.body.office,
        },
            (err, leader) => {
                CheckError.IfError(err, res, leader);
            });
};

const leaderUpdateOne = (req, res) => {
    if (!req.params.id) {
        return res
            .status(404)
            .json({
                "message": "Not found, id is required"
            });
    }
    Leader
        .findById(req.params.id)
        .exec((err, leader) => {

            CheckError.IfModelNull(err, res, leader);

            leader.name = req.body.name;
            leader.office = req.body.office;

            leader.save((err, leader) => {
                CheckError.IfError(err, res, leader);
            });
        })
}

module.exports = {
    leaderReadOne,
    leadersFindAll,
    leaderCreate,
    leaderUpdateOne,
    leaderDeleteOne
};