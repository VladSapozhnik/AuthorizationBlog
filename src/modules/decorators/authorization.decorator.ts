import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
