import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ValidateService } from "src/shared/service";

@Injectable()
export class UserDeleteService {
  constructor(
    private prisma: PrismaService,
    private validateService: ValidateService,
  ) {}

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
