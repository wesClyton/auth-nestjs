import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import { IAuthRequest } from "../interface";

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<IAuthRequest>();

  return request.user;
});
