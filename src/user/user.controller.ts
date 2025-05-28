import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      success: true,
      message: `This action returns a user with id: ${id}`,
    };
  }
}
