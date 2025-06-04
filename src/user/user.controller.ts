import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user-dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update.user-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { UpdatePassWordDto } from './dto/update-password-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(jwtAuthGuard) //
  @Get('me')
  async findOne(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.findOneByOrFail({ id: req.user.id });
    return {
      success: true,
      message: 'User fetched successfully',
      data: new UserResponseDto(user),
    };
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return {
      success: true,
      message: 'User Authenticated successfully',
      data: new UserResponseDto(user),
    };
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me')
  async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    const user = await this.userService.update(req.user.id, dto);
    return {
      success: true,
      message: 'User updated successfully',
      data: new UserResponseDto(user),
    };
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me/password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePassWordDto,
  ) {
    const user = await this.userService.updatePassword(req.user.id, dto);
    return {
      success: true,
      message: 'Password updated successfully',
      data: new UserResponseDto(user),
    };
  }

  @UseGuards(jwtAuthGuard)
  @Delete('me')
  async remove(@Req() req: AuthenticatedRequest) {
    const user = await this.userService.remove(req.user.id);
    return {
      success: true,
      message: 'User deleted successfully',
      data: new UserResponseDto(user),
    };
  }
}
