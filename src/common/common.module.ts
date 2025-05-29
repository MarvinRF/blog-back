import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hash.service';
import { BcryptHashingService } from './hashing/bcript-hashing.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptHashingService,
    },
  ],
  exports: [HashingService],
})
export class CommonModule {}
