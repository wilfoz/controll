const mongoose = require('mongoose');
const Tower = mongoose.model('Tower');

const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const towersFindAll = Query.FindAll(Tower);
const towerReadOne = Query.ReadOne(Tower);
const towerDeleteOne = Query.DeleteOne(Tower);

const towerCreate = (req, res) => {

    const { project, name, type, locality, released, foundation_MC, foundation_A, foundation_B, foundation_C, foundation_D } = req.body;

    const lng = req.body.coords.coordinates[0];
    const lat = req.body.coords.coordinates[1];

    Tower
    .create({
        project, 
        name,
        type,
        locality,
        coords: {
            type: "Point",
            coordinates: [
                parseFloat(lng),
                parseFloat(lat)
            ]
        },
        forward: parseFloat(req.body.forward),
        height: parseFloat(req.body.height),
        released,
        foundation_MC,
        foundation_A,
        foundation_B,
        foundation_C,
        foundation_D,
    },
        (err, tower) => {
            CheckError.IfError(err, res, tower);
        });
};

const towerUpdateOne = (req, res) => {
    const { project, name, type, locality, released, foundation_MC, foundation_A, foundation_B, foundation_C, foundation_D } = req.body;
    
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
            
            tower.project = project;
            tower.name = name;
            tower.type = type;
            tower.locality = locality;
            tower.coords = {
                type: "Point",
                coordinates: [
                    parseFloat(lng),
                    parseFloat(lat)
                ]
            };
            tower.forward = parseFloat(req.body.forward);
            tower.height = parseFloat(req.body.height);
            tower.released = released;
            tower.foundation_MC = foundation_MC;
            tower.foundation_A = foundation_A;
            tower.foundation_B = foundation_B;
            tower.foundation_C = foundation_C;
            tower.foundation_D = foundation_D;
            
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