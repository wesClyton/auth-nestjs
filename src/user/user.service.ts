import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { ValidateService } from 'src/shared/service/validate.service';

@Injectable()
export class UserService {

  constructor(
    private prisma: PrismaService, 
    private validateService: ValidateService
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

  findAll() {
    return this.prisma.user.findMany();
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

    if(!level) {
      level = undefined;
    }

    return this.prisma.user.update({
      data: { email, level, name, password },
      where: {
        id
      }
    })
  }

  async updatePartial(id: string, updatePatchUserDto: UpdatePatchUserDto) {

    const data: any = {}

    for (const property in updatePatchUserDto) {
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
