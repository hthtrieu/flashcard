import { Container, Inject } from 'typedi';
import { FailureMsgResponse, SuccessMsgResponse } from '../../core/ApiResponse';
import { UserService } from '../../services/user/UserService';
import { UserServiceInterface } from '../../services/user/UserServiceInterface';

export class UserProfileController {

 @Inject(() => UserService)
  private userService: UserServiceInterface;

  editProfile = async (req: any, res: any) => {
    const data = {
      image: req.file,
      username: req.body.username,
      email: req.body.email,
      user: req.user,
    };
    const response = await this.userService.editProfile(data);
    if (response) {
      return new SuccessMsgResponse('Profile updated successfully.').send(res);
    }
    return new FailureMsgResponse('Profile updated failed').send(res);
  };

  changePassword = async (req: any, res: any) => {
    await this.userService.changePassword(req, res);
  };
}
