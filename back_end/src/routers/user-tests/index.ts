import { Request, Response, Router } from 'express';
import { TestController } from '../../controllers/test-sets/TestController';
import { UserTestController } from '../../controllers/user-test/UserTestController';
import { AsyncHandler } from '../../helper/AsyncHandler';
import isValidKey from '../../middleware/VerifyApiKey';
import verifyToken from '../../middleware/VerifyToken';

const router = Router();
const controller = new UserTestController();
const testController = new TestController();

//api for save user result
router.post(
  '/test-results',
  [isValidKey, verifyToken],
  AsyncHandler(controller.saveTestResult),
);

//api for get get user recent test result
router.get(
  '/:setId',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getRecentTestResult),
);

router.post(
  '/create-test',
  [isValidKey, verifyToken],
  AsyncHandler(testController.autoCreateTestSet),
);

router.get(
  '/test-result/:testId',
  [isValidKey, verifyToken],
  AsyncHandler(controller.getUserTestResult),
);
export = router;
