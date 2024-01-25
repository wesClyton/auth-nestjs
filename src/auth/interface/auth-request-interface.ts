import { Request } from "express";
import { User } from "../../user/entity/user.entity";

export interface IAuthRequest extends Request {
  user: User;
}
