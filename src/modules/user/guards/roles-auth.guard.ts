import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../../decorators/roles.decorator';
import { TokenService } from '../../token/token.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      //   context.getHandler(),
      //   context.getClass(),
      // ]);
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = await this.tokenService.verifyToken(token);
      req.user = user;
      return user.roles.some((role): boolean =>
        requiredRoles.includes(role.value),
      );
    } catch {
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
