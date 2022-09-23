const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    postThought,
    updateThought,
    deleteThought,
    updateThoughtByID,
    deleteThoughtByID,
    createReaction,
    deleteReactionById
} = require ('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtById).post(postThought).put(updateThought).delete(deleteThought);

router.route('/:userId').post(updateThoughtByID).delete(deleteThoughtByID);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions').delete(deleteReactionById);


module.exports = router;