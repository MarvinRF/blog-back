import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseIntPipe } from '../common/pipes/custom-parse-int-pipe.pipe';

@Controller('user')
export class UserController {
  @Get(':id')
  findOne(
    @Param('id', CustomParseIntPipe)
    id: number,
  ) {
    return {
      success: true,
      message: `This action returns a user with id: ${id}`,
    };
  }
}
