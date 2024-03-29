import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IAuthRequest } from "./interface";
import { IsPublic } from "./decorators";
import { LocalAuthGuard } from "./guards";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: IAuthRequest) {
    return this.authService.login(req.user);
  }
}
