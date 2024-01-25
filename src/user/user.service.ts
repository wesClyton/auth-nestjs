import { Injectable } from "@nestjs/common";
import { CreateUserDto, UpdatePatchUserDto, UpdatePutUserDto } from "./dto";
import { UserDeleteService, UserGetService, UserPatchService, UserPostService, UserPutService } from "./service";

@Injectable()
export class UserService {
  constructor(
    private userPostService: UserPostService,
    private userPutService: UserPutService,
    private userGetService: UserGetService,
    private userPatchService: UserPatchService,
    private userDeleteService: UserDeleteService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userPostService.create(createUserDto);
  }

  async findMany(searchParams) {
    return await this.userGetService.findMany(searchParams);
  }

  async findById(id: string) {
    return await this.userGetService.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userGetService.findByEmail(email);
  }

  async update(id: string, updatePutUserDto: UpdatePutUserDto) {
    return await this.userPutService.update(id, updatePutUserDto);
  }

  async updatePartial(id: string, updatePatchUserDto: UpdatePatchUserDto) {
    return await this.userPatchService.update(id, updatePatchUserDto);
  }

  async remove(id: string) {
    return await this.userDeleteService.remove(id);
  }
}
