import { Router } from "express";
import verifyToken from "../../middleware/VerifyToken";
import UploadAvatarController from '../../controllers/user/UploadAvatarController';
import multer from "multer";
const upload = multer(
    { dest: "uploads/" }
);

const uploadAvatarController = new UploadAvatarController();
const router = Router();

router.post('/upload-avatar', [verifyToken, upload.single("avatar")], uploadAvatarController.uploadAvatar)

router.get('/images/:key', uploadAvatarController.getAvatar)

export = router