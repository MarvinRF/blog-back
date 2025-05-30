import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomParseIntPipe } from '../common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create.user-dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update.user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(jwtAuthGuard) //
  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id', CustomParseIntPipe)
    id: number,
  ) {
    console.log(req.user.id);
    console.log(req.user.email);
    return {
      success: true,
      message: `This action returns a user with id: ${id}`,
    };
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(jwtAuthGuard)
  @Patch('me')
  update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
    return this.userService.update(req.user.id, dto);
  }
}
