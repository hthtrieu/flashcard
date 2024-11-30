import { Router } from 'express';
import { AsyncHandler } from '../../helper/AsyncHandler';
import { isAdmin } from '../../middleware/isAdmin';
import { UploadFile } from '../../middleware/UploadFile';
import isValidRequest from '../../middleware/ValidRequest';
import isValidKey from '../../middleware/VerifyApiKey';
import verifyToken from '../../middleware/VerifyToken';
import VocabularySetController from '../../controllers/vocabulary-set/VocabSetController';

const router = Router();
const vocabSetController = new VocabularySetController();

router.get(
  '/public-sets',
  [isValidKey],
  AsyncHandler(vocabSetController.get_all_public_sets),
);

router.get('/:id', [isValidKey], AsyncHandler(vocabSetController.getSet));

router.post(
  '/',
  [isValidKey, verifyToken, isAdmin, UploadFile.any()],
  AsyncHandler(vocabSetController.createSet),
);

router.put(
  '/:id',
  [isValidKey, verifyToken, isAdmin, UploadFile.any()],
  AsyncHandler(vocabSetController.updateSet),
);

router.delete(
  '/:id',
  [isValidKey, verifyToken, isAdmin],
  vocabSetController.deleteSet,
);

// router.post("/add-card", [isValidKey, verifyToken], vocabSetController.addCardToSet);

export default router;
