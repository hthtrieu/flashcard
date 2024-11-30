import { Router } from 'express';

import { ApproveSetController } from '../../controllers/approve-sets/ApproveSetController';
import { AsyncHandler } from '../../helper/AsyncHandler';
import { isAdmin } from '../../middleware/isAdmin';
import isValidRequest from '../../middleware/ValidRequest';
import isValidKey from '../../middleware/VerifyApiKey';
import verifyToken from '../../middleware/VerifyToken';

const controller = new ApproveSetController();
const router = Router();

router.get(
  '/pending',
  [verifyToken, isValidKey, isAdmin],
  AsyncHandler(controller.getPendingSets),
);
router.post(
  '/approve',
  [verifyToken, isValidKey, isAdmin],
  AsyncHandler(controller.approveSet),
);
router.post(
  '/reject',
  [verifyToken, isValidKey, isAdmin],
  AsyncHandler(controller.rejectSet),
);
router.post(
  '/get-set',
  [verifyToken, isValidKey, isAdmin],
  AsyncHandler(controller.getSetByAdmin),
);
export default router;
