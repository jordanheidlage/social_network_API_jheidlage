const router = require('express').Router();
// Import all of the API routes from /api/index.js
const apiRoutes = require ('./api');

router.use('./api', apiRoutes);

router.use((req, res) => {
    res.status(404);
});

module.exports = router