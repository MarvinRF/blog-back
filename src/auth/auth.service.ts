import { Injectable, Body, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { HashingService } from 'src/common/hashing/hash.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwt-payload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // email | UserService <- UserModule
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    //comparar sennha com Hash HashingService <- CommonModule
    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password, // senha do usuário que está no banco de dados
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Unauthorized');
    }

    // JWT service <- JwtModule
    const JwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const acessToken = await this.jwtService.signAsync(JwtPayload);

    user.forceLogout = false;
    await this.userService.save(user);

    return { acessToken };
  }
}
