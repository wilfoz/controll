const mongoose = require('mongoose');
const Tower = mongoose.model('Tower');
const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const towersFindAll = Query.FindAll(Tower);
const towerReadOne = Query.ReadOne(Tower);
const towerDeleteOne = Query.DeleteOne(Tower);

const towerCreate = (req, res) => {

    const lng = req.body.coords.coordinates[0];
    const lat = req.body.coords.coordinates[1];

    Tower
    .create({
        name: req.body.name,
        type: req.body.type,
        locality: req.body.locality,
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(lng),
                parseFloat(lat)
            ]
        },
        forward: parseFloat(req.body.forward),
        weight: parseFloat(req.body.weight),
        height: parseFloat(req.body.height),
        released: req.body.released,
    },
        (err, tower) => {
            CheckError.IfError(err, res, tower);
        });
};

const towerUpdateOne = (req, res) => {

    const lng = req.body.coords.coordinates[0];
    const lat = req.body.coords.coordinates[1];

    if (!req.params.id) {
        return res
            .status(404)
            .json({
                "message": "Not found, id is required"
            });
    }
    Tower
        .findById(req.params.id)
        .exec((err, tower) => {

            CheckError.IfModelNull( err, res, tower );
     
            tower.name = req.body.name;
            tower.type = req.body.type;
            tower.locality = req.body.locality;
            tower.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(lng),
                    parseFloat(lat)
                ]
            };
            tower.forward = parseFloat(req.body.forward);
            tower.weight = parseFloat(req.body.weight);
            tower.height = parseFloat(req.body.height);
            tower.released = req.body.released;
            tower.save((err, tower) => {
                CheckError.IfError(err, res, tower);
            });
        })
};

module.exports = {
    towerReadOne,
    towersFindAll,
    towerCreate,
    towerUpdateOne,
    towerDeleteOne,
};