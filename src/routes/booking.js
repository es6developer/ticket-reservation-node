import express from 'express';
import { bookTicket, cancelTicket, getTicketsByUser } from '../controllers/booking';
// express router object
const router = express.Router();


// Api Routes 
router.post('/book', bookTicket);
router.get('/cancel/:id', cancelTicket);
router.get('/user', getTicketsByUser)


module.exports = router;