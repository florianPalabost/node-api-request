import express from 'express';
const router = express.Router();
const ApiController = require('../src/controllers/ApiController');

router.get('/', (req, res) => ApiController.retrieveElements(req, res));
router.post('/', (req, res) => ApiController.retrieveElements(req, res));
router.post('/stats', (req, res) => ApiController.bench(req, res));

module.exports = router;