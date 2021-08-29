import express from 'express';
const router = express.Router();
const ApiController = require('../src/controllers/ApiController');

router.get('/', (req, res) => ApiController.retrieveElements(req, res));

module.exports = router;