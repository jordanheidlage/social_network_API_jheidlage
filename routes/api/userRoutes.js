const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUserById,
    deleteUserById,
    postNewFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(postNewUser);

router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(postNewFriend).delete(deleteFriend);

module.exports = router;