
import express from 'express';

import { createUser,getuserBYEmail,getusers,getUserByID,updateUser,deleteUser, getuserBYEmailClient} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);

router.post('/login', getuserBYEmail);
router.post('/loginclient', getuserBYEmailClient);

router.get("/",getusers);
//router.post('/refreshToken/',RefreshToken);
router.get('/:id', getUserByID);

router.put('/:id', updateUser);
 
router.delete('/:id', deleteUser);

export default router;
