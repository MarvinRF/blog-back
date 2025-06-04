import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'title must be a string' })
  @Length(10, 150, { message: 'title must have between 10 and 150 characters' })
  title: string;

  @IsString({ message: 'excerpt must be a string' })
  @Length(10, 200, {
    message: 'excerpt must have between 10 and 200 characters',
  })
  excerpt: string;

  @IsString({ message: 'the main content must be a string' })
  @IsNotEmpty({ message: 'content should not be empty' })
  content: string;

  @IsUrl(
    { require_tld: false },
    { message: 'Image URL must contain a valid URL' },
  ) //top level domain prohibits localhost e IP
  @IsOptional()
  coverImageUrl: string;
}
