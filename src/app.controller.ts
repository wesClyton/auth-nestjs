import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "./user/entities/user.entity";
import { CurrentUser, IsPublic } from "./auth/decorators";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @IsPublic()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("me")
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
