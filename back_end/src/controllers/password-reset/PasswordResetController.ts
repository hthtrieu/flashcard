import { Request, Response } from 'express';
import Container, { Inject } from 'typedi';

import {
  FailureMsgResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../../core/ApiResponse';
import { IPasswordResetService } from '../../services/password-reset/IPasswordResetService';
import { PasswordResetService } from '../../services/password-reset/PasswordResetService';

export class PasswordResetController {
  @Inject(() => PasswordResetService)
  private passwordResetService: IPasswordResetService;

  forgot_password = async (req: Request, res: Response) => {
    const email = req.body.email;
    const response = await this.passwordResetService.forgot_password(email);
    return new SuccessResponse('OTP sended', response.otp).send(res);
  };
  reset_password = async (req: Request, res: Response) => {
    const data = {
      email: req.body.email,
      otp: req.body.otp,
      password: req.body.password,
    };
    const response = await this.passwordResetService.reset_password(data);
    if (response) {
      return new SuccessMsgResponse('Password reset successfully').send(res);
    } else {
      return new FailureMsgResponse('Password reset failed').send(res);
    }
  };
}
