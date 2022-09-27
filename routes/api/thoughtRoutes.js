const router = require('express').Router();

const {

} = require ('../../controllers/thoughtController');

router.route('/').get().post();

router.route('/:thoughtId').get().put().delete();

router.route('/:thoughtId/reactions').post();

router.route('/:thoughtId/reactions/:reactionId').delete();


module.exports = router;