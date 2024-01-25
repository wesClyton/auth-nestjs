import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginatorService } from "src/shared/service";

@Injectable()
export class UserGetService {
  constructor(
    private prisma: PrismaService,
    private paginatorService: PaginatorService,
  ) {}

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findMany({
    page,
    perPage,
    name,
  }: {
    page?: number;
    perPage?: number;
    order?: string;
    name?: string;
  }): Promise<any> {
    //PaginatedResult<User>

    let where: Prisma.UserWhereInput = {};
    let orderBy: Prisma.UserOrderByWithRelationInput = {};

    orderBy = {
      name: "asc",
    };

    where = {
      name: {
        contains: name,
        mode: "insensitive",
      },
    };

    return this.paginatorService.paginator(
      this.prisma.user,
      {
        where,
        orderBy,
      },
      {
        page,
        perPage,
      },
    );
  }
}
