import { Request, Response, Router } from 'express';
import { UserProgressController } from '../../controllers/user-progress/UserProgressController';
import { AsyncHandler } from '../../helper/AsyncHandler';
import isValidKey from '../../middleware/VerifyApiKey';
import verifyToken from '../../middleware/VerifyToken';

const router = Router();
const controller = new UserProgressController();

//api update flashcard status of user progress
router.post(
  '/',
  [isValidKey, verifyToken],
  AsyncHandler(controller.updateUserProgress),
);

//api for get user progress all sets
router.get(
  '/progress',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getUserProgress),
);

//api for get user progress by setId
router.get(
  '/progress/:setId',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getUserProgressBySetId),
);

export = router;
