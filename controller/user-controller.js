const { User } = require("../models");

const userController = {

    getAllUsers(req, res) {
      User.find()
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUser) => res.json(dbUser))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    