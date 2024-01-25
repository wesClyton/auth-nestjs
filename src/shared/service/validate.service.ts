import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ValidateService {
  constructor(private prisma: PrismaService) {}

  async fieldExists(obj: { model: string; property: string; value: any; id?: string }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const validate = await this.prisma[obj.model].findMany({
      where: {
        [obj.property]: obj.value,
        ...(obj.id ? { NOT: { id: obj.id } } : {}),
      },
    });

    if (validate.length) {
      throw new NotFoundException(`This ${obj.property} is alread register`);
    }
  }
}
