import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { Authorization } from '../decorators/authorization.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return this.userService.register(res, registerUserDto);
  }

  @Post('login')
  login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginUserDto,
  ) {
    return this.userService.login(res, loginDto);
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.userService.refresh(req, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.userService.logout(res);
  }
  @Authorization()
  @Get('profile')
  profile(@Req() req: Request) {
    return req.user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
