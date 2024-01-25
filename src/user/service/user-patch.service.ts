import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDto } from "../dto/update-patch-user.dto";
import { ValidateService } from "src/shared/service";

@Injectable()
export class UserPatchService {
  constructor(
    private prisma: PrismaService,
    private validateService: ValidateService,
  ) {}

  async update(id: string, updatePatchUserDto: UpdatePatchUserDto) {
    const data: any = {};

    for (const property in updatePatchUserDto) {
      if (property) {
        data[property] = updatePatchUserDto[property];
      }
    }

    if (data.email) {
      await this.validateService.fieldExists({ model: "user", property: "email", value: data.email, id });
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
