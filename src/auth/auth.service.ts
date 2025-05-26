import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  doLogin() {
    return 'Olá, você está logado! (authService)';
  }
}
