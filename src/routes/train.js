import express from 'express';
import { createTrain, getStartAndEndPoint, getTrainByStartAndEndPoint, getTrainDetailsWithSeat } from '../controllers/train'
// express router object
const router = express.Router();


// Api Routes 
router.post('/', createTrain);
router.get('/autocomplete', getStartAndEndPoint)
router.post('/search', getTrainByStartAndEndPoint);
router.post('/seat-availability', getTrainDetailsWithSeat);

module.exports = router;