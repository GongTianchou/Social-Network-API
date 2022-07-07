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

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: "thoughts",
            select: "-__v",
          })
          .populate({
            path: "friends",
            select: "-__v",
          })
          .select("-__v")
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this ID" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      createUser({ body }, res) {
        User.create(body)
          .then((dbUser) => res.json(dbUser))
          .catch((err) => res.status(400).json(err));
      },
}