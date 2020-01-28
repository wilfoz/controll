const mongoose = require('mongoose');
const moment = require('moment');

const Prod = mongoose.model('Production');
const Tower = mongoose.model('Tower');
const Activity = mongoose.model('Activity');

const Query = require('../utils/querys');
const CheckError = require('../utils/utils');

const productionsFindAll = (req, res) => {
  Prod
    .find({})
    .populate({path: 'tower'})
    .populate({path: 'activity'})
    .exec((err, production) => {
      if (!production) {
        return res
          .status(404)
          .json({ "message": "production not found" });
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

const productionReadOne = (req, res) => {
  Prod
    .findById(req.params.id)
    .populate({path: 'tower'})
    .populate({path: 'activity'})
    .exec((err, prodcution) => {
      if (!prodcution) {
        return res
          .status(404)
          .json({ "message": "prodcution not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {

        return res
          .status(200)
          .json(prodcution);
      }
    });
};

const setModelsIds = (nameTower, nameActivity) => {
 
  const idTower = Tower.findOne({ name: nameTower }).then((result) => result._id);
  const idActivity = Activity.findOne({ name: nameActivity }).then((result) => result._id);

  return Promise.all([idTower, idActivity])
    .then(function (results) {
      return results
    })
}

const productionCreate = (req, res) => {

  let formatDate = moment(req.body.date).format("L");
  console.log(formatDate);

  setModelsIds(req.body.tower, req.body.activity)
    .then((results) => {
      Prod
        .create({
          date: formatDate,
          leader: req.body.leader,
          tower: results[0],
          activity: results[1],
          status: req.body.status,
        },
          (err, production) => {
            CheckError.IfError(err, res, production);
          });
    });
};

const productionUpdateOne = (req, res) => {

  if (!req.params.id) {
    return res
      .status(404)
      .json({
        "message": "Not found, id is required"
      });
  }
  Prod
    .findById(req.params.id)
    .exec((err, production) => {
      if (!production) {
        return res
          .status(404)
          .json({
            "message": "id not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      setModelsIds(req.body.tower, req.body.activity)
        .then((results) => {
          production.date = req.body.date;
          production.leader = req.body.leader;
          production.status = req.body.status;
          production.tower = results[0];
          production.activity = results[1];
          production.save((err, prod) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              res
                .status(200)
                .json(prod);
            }
          });
        })
    }
    );
};

const productionDeleteOne = Query.DeleteOne(Prod);

module.exports = {
  productionsFindAll,
  productionReadOne,
  productionCreate,
  productionUpdateOne,
  productionDeleteOne
};