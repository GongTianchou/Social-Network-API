const { Thoughts, User } = require("../models");

const thoughtController = {

  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },


  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find any thoughts with the ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  

  createThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Did not find the User with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

 
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Did not find the thought with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },


  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Did not find any thoughts with the ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  ThoughtReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughts) => {
        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "Did not find any thoughts with the ID" });
          return;
        }
        res.json(dbThoughts);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughts) => {
        console.log(dbThoughts);

        if (!dbThoughts) {
          res
            .status(404)
            .json({ message: "Did not find any thoughts with the ID" });
          return;
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
