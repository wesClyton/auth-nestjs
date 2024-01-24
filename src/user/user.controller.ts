import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, HttpCode, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { IsValidIdInterceptor } from 'src/shared/interceptor/is-valid-id.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';


export interface IParamsUserSearch {
  page?: number,
  perPage?: number,
  name?: string
}

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService, 
    private readonly prisma: PrismaService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseInterceptors(new IsValidIdInterceptor('user'))
  put(
    @Param('id') id: string, 
    @Body() updatePutUserDto: UpdatePutUserDto,
  ) {
    return this.userService.update(id, updatePutUserDto);
  }

  @Get()
  findMany(
    @Query() query: IParamsUserSearch
  ) {
    return this.userService.findMany(query);
  }

  
  @Get(':id')
  @UseInterceptors(new IsValidIdInterceptor('user'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new IsValidIdInterceptor('user'))
  path(@Param('id') id: string, @Body() updatePatchUserDto: UpdatePatchUserDto) {
    return this.userService.updatePartial(id, updatePatchUserDto);
  }

  @Delete(':id')
  @UseInterceptors(new IsValidIdInterceptor('user'))
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
