import { Request, Response, Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
import isValidRequest from "../../middleware/ValidRequest";
import verifyToken from "../../middleware/VerifyToken";
import SignUpRequest from "../../dto/SignUpRequest";
// import SignInRequest from "../../requests/auth/SignInRequest";
import SignInRequest from "../../dto/SignInRequest";
import isValidKey from "../../middleware/VerifyApiKey";

const router = Router();
const authController = new AuthController();

router.post('/sign-in', [isValidKey, isValidRequest(SignInRequest)], authController.sign_in);

router.post('/sign-up', [isValidKey, isValidRequest(SignUpRequest)], authController.sign_up);

router.get('/me', [isValidKey, verifyToken], authController.me);

router.post('/get-token', authController.get_token);


export default router;
