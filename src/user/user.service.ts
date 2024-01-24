import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { ValidateService } from 'src/shared/service/validate.service';
import { PaginateFunction, PaginatorService } from 'src/shared/service/paginate.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  paginate: PaginateFunction;

  constructor(
    private prisma: PrismaService, 
    private validateService: ValidateService,
    private paginatorService: PaginatorService
  ){}

  async create(createUserDto: CreateUserDto) {

    const {email} = createUserDto;
    await this.validateService.fieldExists({ model: 'user', property: 'email', value: email });

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }

    const createdUser = await this.prisma.user.create({ data })

    return {
      ...createdUser,
      password: undefined
    };
  }

  async findMany({ page, perPage, name }:{
    page?: number,
    perPage?: number,
    order?: string,
    name?: string
  }): Promise<any> { //PaginatedResult<User>

      let where: Prisma.UserWhereInput = {};
      let orderBy: Prisma.UserOrderByWithRelationInput = {};

      orderBy = {
        name: 'asc',
      }

      where = {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }

      return this.paginatorService.paginator(
          this.prisma.user,
          {
              where,
              orderBy,
          },
          {
              page,
              perPage: 5
          },
      );
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async update(id: string, {email, level, name, password}: UpdatePutUserDto) {

    await this.validateService.fieldExists({ model: 'user', property: 'email', value: email, id });

    if(isNaN(level) || !level) {
      level = 0;
    }

    return await this.prisma.user.update({
      data: { email, level, name, password },
      where: {
        id
      }
    })
  }

  async updatePartial(id: string, updatePatchUserDto: UpdatePatchUserDto) {

    const data: any = {}

    for (const property in updatePatchUserDto) {
      console.log('property', property)
      if(property) {
        data[property] = updatePatchUserDto[property]
      }
    }

    if (data.email) {
      await this.validateService.fieldExists({ model: 'user', property: 'email', value: data.email, id });
    }

    return this.prisma.user.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id }
    })
  }
}
