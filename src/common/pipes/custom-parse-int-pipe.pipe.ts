import { ParseIntPipe, BadRequestException } from '@nestjs/common';

export class CustomParseIntPipe extends ParseIntPipe {
  constructor() {
    super({
      exceptionFactory: () =>
        new BadRequestException('Parameter must be a Number'),
    });
  }
}
