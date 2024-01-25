import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { SharedModule } from "src/shared/shared.module";
import { UserDeleteService, UserGetService, UserPatchService, UserPostService, UserPutService } from "./service";

@Module({
  controllers: [UserController],
  providers: [UserService, UserDeleteService, UserGetService, UserPatchService, UserPostService, UserPutService],
  imports: [PrismaModule, SharedModule],
  exports: [UserService],
})
export class UserModule {}
