import {Router} from 'express';
import {signup, signin, profile} from '../controllers/auth.controller';
import {VerifyToken} from '../middlewares/varifyToken';
const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', VerifyToken, profile);

export default router;