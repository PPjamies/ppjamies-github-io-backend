import {Router} from 'express'
import {emailValidators} from '../validators/validators';
import {handleContact} from '../controllers/contact-controller';
import {asyncHandler} from '../utils/handler-utils';

const router = Router();

router.post('/', emailValidators, asyncHandler(handleContact));

export default router;