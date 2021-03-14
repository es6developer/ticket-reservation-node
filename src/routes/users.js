import express from 'express';
import { getUserProfile, loginUser, saveUser } from '../controllers/users';
// express router object
const router = express.Router();


// Api Routes 
router.post('/register', saveUser);
router.post('/login', loginUser);
router.get('/', getUserProfile)

module.exports = router;