var express = require('express');
var router = express.Router();

const ClassController = require('../controllers/classes');

/* GET Classes page. */
router.get('/', ClassController.getClass);

/* GET Class Details page. */
router.get('/:id/details', ClassController.getClassDetails);

module.exports = router;
