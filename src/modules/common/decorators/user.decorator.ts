import { createParamDecorator } from '@nestjs/common';
import { User } from '../../user/user.entity';

export interface IRequestUser extends Request {
  user?: User;
}

export const ReqUser = createParamDecorator(
  (data, req: IRequestUser) => req.user,
);
