import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class jwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (!user || info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(
        'Unauthorized, you must have a valid login access',
      );
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
