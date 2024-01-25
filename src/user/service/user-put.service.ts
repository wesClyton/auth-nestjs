import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "../dto/update-put-user.dto";
import { ValidateService } from "src/shared/service";

@Injectable()
export class UserPutService {
  constructor(
    private prisma: PrismaService,
    private validateService: ValidateService,
  ) {}

  async update(id: string, { email, level, name, password }: UpdatePutUserDto) {
    await this.validateService.fieldExists({ model: "user", property: "email", value: email, id });

    if (isNaN(level) || !level) {
      level = 0;
    }

    return await this.prisma.user.update({
      data: { email, level, name, password },
      where: {
        id,
      },
    });
  }
}
