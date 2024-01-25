import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { OrderByEnum } from "../enum";

export class GetManyDTO {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  perPage: number;

  @IsOptional()
  @IsEnum(OrderByEnum)
  orderBy: string;

  @IsOptional()
  orderProperty: string;
}
