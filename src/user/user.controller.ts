import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, Query, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { IsValidIdInterceptor } from 'src/shared/interceptor/is-valid-id.interceptor';
import { PrismaService } from 'src/prisma/prisma.service';

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
  findAll() {
    return this.userService.findAll();
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
