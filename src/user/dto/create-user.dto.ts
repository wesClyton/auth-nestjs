import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { User } from "../entity/user.entity";
import { Transform } from "class-transformer";

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  level: number;
}
