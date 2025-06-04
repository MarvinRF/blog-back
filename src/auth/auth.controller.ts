import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedRequest } from './types/authenticated-request';
import { jwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth') // /auth/login
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return {
      success: true,
      message: 'User authenticated successfully',
      data: token,
    };
  }
  @UseGuards(jwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: AuthenticatedRequest) {
    await this.authService.logout(req.user.id);

    return {
      success: true,
      message: 'User logged out successfully',
      data: null,
    };
  }
}
