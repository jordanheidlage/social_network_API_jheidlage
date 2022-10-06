const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts)).catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
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
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { runValidators: true, new: true },
                )
            }).then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with that ID' })
                }

                res.json({ message: 'thought created' })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // update a thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thoughts)
        )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
            ?res.status(404).json({ message: 'No thoughts with that ID' })
            : User.deleteMany({ _id: { $in: thoughts.users } })
            )
            .then(() => res.json({ message: 'User and Thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // post to create a reaction stored in a single thoughts reactions array - this method is unique in that we add the entire body of the reaction rather than the id with the mongodb $addToSet operator
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true}
            )
            .then((dbThoughtData) => 
            !dbThoughtData
                ?res.status(404).json({ message: 'No thought with this Id!'})
                : res.json(dbThoughtData)
            )
            .catch((err)=> res.status(500).json(err));
    },
    // delete to pull and remove a reaction by the reactions reactionId - then updates the reaction array associated with the thought in question by removing its reactionId from the reaction array
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((dbThoughtData) => 
            !dbThoughtData? res.status(404).json({ message: 'No thought with this Id!'})
            : res.json(dbThoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
};