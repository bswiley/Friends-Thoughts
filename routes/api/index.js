const router = require('express').Router();
const apiRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', apiRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;