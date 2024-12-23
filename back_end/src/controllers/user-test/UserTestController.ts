import { Request, Response } from 'express';
import { Container, Inject } from 'typedi';
import {
  FailureMsgResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../../core/ApiResponse';
import { UserTestService } from '../../services/user-test/UserTestService';

export class UserTestController {
  @Inject(() => UserTestService)
  private service: UserTestService;


  saveTestResult = async (req: any, res: Response): Promise<any> => {
    const data = {
      user: req.user,
      testId: req.body.testId,
      answers: req.body.answers,
    };
    const result = await this.service.saveTestResult(
      data?.user?.id,
      data.testId,
      data.answers,
    );
    if (!result) {
      return new FailureMsgResponse('Save the test failed!').send(res);
    } else {
      return new SuccessResponse('Save the test successfully!', result).send(
        res,
      );
    }
  };

  getRecentTestResult = async (req: any, res: Response): Promise<any> => {
    const data = {
      user: req.user,
      setId: req.params.setId,
    };
    const result = await this.service.getUserRecentTestOfSet(
      data.user?.id,
      data.setId,
    );
    if (!result) {
      return new FailureMsgResponse('failed!').send(res);
    } else {
      return new SuccessResponse('successfully!', result).send(res);
    }
  };

  getUserTestResult = async (req: any, res: Response): Promise<any> => {
    const data = {
      user: req.user,
      testId: req.params.testId,
    };
    const result = await this.service.getUserTestResult(
      data.user?.id,
      data.testId,
    );
    if (!result) {
      return new FailureMsgResponse('failed!').send(res);
    } else {
      return new SuccessResponse('successfully!', result).send(res);
    }
  };
}
