import { IsEnum, IsOptional } from "class-validator";
import { GetManyDTO } from "src/shared/dto";
import { UserOrderByEnum } from "../enum";

export class GetManyUserDto extends GetManyDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsEnum(UserOrderByEnum)
  @IsOptional()
  orderProperty: string;
}
