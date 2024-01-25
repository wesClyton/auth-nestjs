import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from ".";

export class UpdatePatchUserDto extends PartialType(CreateUserDto) {}
