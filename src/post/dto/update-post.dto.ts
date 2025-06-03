import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(
  PickType(CreatePostDto, ['title', 'coverImageUrl', 'excerpt', 'content']),
) {
  @IsOptional() //vai depender da lógica que criarmos no service ou no Next.js
  @IsBoolean({ message: 'publish post field must be a boolean' })
  published?: boolean;
}
