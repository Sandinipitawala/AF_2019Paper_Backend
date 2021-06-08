const Room = require('../models/room.model');

const createRoom = async (req, res) => {
  if (req.body) {
    const room = new Room(req.body);
    await room.save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const getAllRoom = async (req, res) => {
  await Room.find({}).populate('categories', 'name description')
  .then(data => {
    res.status(200).send({ data: data });
  })
  .catch(error => {
    res.status(500).send({ error: error.message });
  });
}

const getCategoryForRoom = async (req, res) => {
  if (req.params && req.params.id) {
    await Room.findById(req.params.id)
    .populate('categories', 'name description')
    .then(data => {
      res.status(200).send({ categories: data.categories });
    })
    .catch(error => {
      res.status(500).send({ error: error.message });
    });
  }
}

const calculateAmount = async (req, res) => {
  if (req.params && req.params.id) {
    const category = await category.findById(req.params.id).populate('rooms', 'amount')
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
    createRoom,
    getAllRoom,
    getCategoryForRoom
  };