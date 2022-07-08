const router = require("express").Router();

const {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller.js");


router.route("/").get(getAllUsers).post(createUser);


router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;