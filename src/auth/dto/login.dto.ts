import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsString({ message: 'Invalid password' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
