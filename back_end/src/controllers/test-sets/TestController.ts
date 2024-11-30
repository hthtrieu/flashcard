import { Request, Response } from 'express';
import { Container, Inject } from 'typedi';

import {
  FailureMsgResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from '../../core/ApiResponse';
import { TestService } from '../../services/test-sets/TestService';

export class TestController {
  // private testService: TestService;
  // constructor() {
  //   this.testService = Container.get(TestService);
  // }
  @Inject(() => TestService)
  private testService: TestService;
  autoCreateTestSet = async (req: any, res: Response): Promise<any> => {
    const setId = req.body.setId;
    const data = {
      setId: req.body.setId,
      userId: req.user.id,
      level: req.body.level,
    };
    const result = await this.testService.createTest(data);
    if (!result) {
      return new FailureMsgResponse('Create card failed!').send(res);
    } else {
      return new SuccessResponse('Create card successfully!', result).send(res);
    }
  };
}
