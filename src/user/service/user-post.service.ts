import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ValidateService } from "src/shared/service";

@Injectable()
export class UserPostService {
  constructor(
    private prisma: PrismaService,
    private validateService: ValidateService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    await this.validateService.fieldExists({ model: "user", property: "email", value: email });

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }
}
