const db = require('../models');
const Order = db.orders;

exports.create = (req, res) => {
  if (Object.keys(req.body).length !== 0) {
    if (Array.isArray(req.body)) {
      Order.insertMany(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || `Save fail`
          });
        });
    } else {
      const { Id, Message } = req.body;
      if (Id !== '' && Message !== '') {
        const order = Order({ Id, Message });
        order.save(order)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || `Save fail`
            });
          });
      }
    }
    return;
  }

  return res.status(400).send({ message: `Content can not be empty` });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.find({ Id: id }, { __v: 0 })
    .then(data => {
      if (!data) res.status(404).send({ message: `Not found order with id ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: `Error retrieving order with id = ${id}` });
    });
};


exports.deleteId = (req, res) => {
  const id = req.params.id;

  Order.deleteMany({ Id: id })
    .then(({ deletedCount }) => {
      res.send({
        message: `${deletedCount} Orders were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while removing all Orders`
      });
    });
};
