import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginatedResult } from "src/shared/interface";
import { PaginatorService } from "src/shared/service";
import { GetManyUserDto } from "../dto";

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

  async findMany(params: GetManyUserDto): Promise<PaginatedResult<User>> {
    let where: Prisma.UserWhereInput = {};
    let orderBy: Prisma.UserOrderByWithRelationInput = {};

    const { page, perPage, name, email, id, orderProperty } = params;

    orderBy = {
      ...(params.orderBy ? { [orderProperty]: params.orderBy } : {}),
    };

    where = {
      ...(id ? { id } : {}),
      ...(name
        ? {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }
        : {}),
      ...(email
        ? {
            email: {
              contains: email,
              mode: "insensitive",
            },
          }
        : {}),
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
