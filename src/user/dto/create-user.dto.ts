import { IsEmail, IsIn, IsInt, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { Unique } from "src/shared/decorator/is-unique.decorator";
import { Request } from 'express';

export class CreateUserDto extends User {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsStrongPassword({
        minLength: 6
    })
    password: string;
    
    @IsString()
    name: string;

    @IsOptional()
    level: number;
}
