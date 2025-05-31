import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePassWordDto {
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  currentPassword: string;

  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'New password must have at least 6 characters' })
  @MaxLength(64, { message: 'New password must not exceed 64 characters' })
  newPassword: string;
}
