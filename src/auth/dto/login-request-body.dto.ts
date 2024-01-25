import { IsEmail, IsString } from "class-validator";

export class LoginRequestBodyDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
