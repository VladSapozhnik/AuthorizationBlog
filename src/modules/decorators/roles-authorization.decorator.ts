import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../user/guards/roles-auth.guard';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { Roles } from './roles.decorator';

export function RolesAuthorization(...roles: string[]) {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
}
