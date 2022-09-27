const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // post to create a new thought and push created thoughts _id to associate users thoughts array
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update a thought by _id
    updateThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
        )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
        ?res.status(404).json({ message: 'No thought with that ID' })
        : User.deleteMany({ _id: { $in: thought.users } })
            )
            .then(() => res.json({ message: 'User and Thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // post to create a reaction stored in a single thoughts reactions array
    createReaction(req, res) {

    },
    // delete to pull and remove a reaction by the reactions reactionId
    deleteReaction(req, res) {

    },
}