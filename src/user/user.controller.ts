import { Controller, Get, Param } from '@nestjs/common';
import { CustomParseIntPipe } from '../common/pipes/custom-parse-int-pipe.pipe';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(private readonly configService: ConfigService) {}

  @Get(':id')
  findOne(
    @Param('id', CustomParseIntPipe)
    id: number,
  ) {
    console.log(process.env.TESTE);
    return {
      success: true,
      message: `This action returns a user with id: ${id}`,
    };
  }
}
