import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;

    const user = request.user;

    return data ? user![data] : user;
  },
);
