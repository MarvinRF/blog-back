import { Controller, Post } from '@nestjs/common';

@Controller('auth') // /auth/login
export class AuthController {
  @Post('login')
  login() {}
}
