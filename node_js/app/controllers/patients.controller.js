const db = require('../models');
const Patient = db.patients;


exports.findAll = (_, res) => {
  Patient.find({}, { __v: 0 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Search fail'
      });
    });
};
