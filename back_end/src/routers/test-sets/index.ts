import { Request, Response, Router } from 'express';

import { TestController } from '../../controllers/test-sets/TestController';
import { AsyncHandler } from '../../helper/AsyncHandler';
import { isAdmin } from '../../middleware/isAdmin';
import isValidKey from '../../middleware/VerifyApiKey';
import verifyToken from '../../middleware/VerifyToken';

const router = Router();
const controller = new TestController();

router.post(
  '/auto-create-test-set',
  [isValidKey, verifyToken, isAdmin],
  AsyncHandler(controller.autoCreateTestSet),
);

export default router;
