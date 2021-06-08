const Category = require('../models/category.model');

const createCategory = async (req, res) => {
  if (req.body) {
    const category = new Category(req.body);
    category.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllCategory = async (req, res) => {
  await Category.find({}).populate('rooms', 'code amount wing pax')
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

const getRoomsForCategory = async (req, res) => {
  if (req.params && req.params.id) {
    await Category.findById(req.params.id)
    .populate('rooms', 'code amount wing pax')
    .then(data => {
      res.status(200).send({ rooms: data.rooms });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const calculateAmount = async (req, res) => {
  if (req.params && req.params.id) {
    const category = await Category.findById(req.params.id).populate('rooms', 'amount')
    let totalAmount = 0;

    if (category.rooms.length > 0) {
      category.rooms.map((room) => {
        totalAmount += room.amount;
      });
    }
    res.status(200).send({ totalAmount: totalAmount });
  }
}

module.exports = {
    createCategory,
    getAllCategory,
    getRoomsForCategory,
    calculateAmount
  };