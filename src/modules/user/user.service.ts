import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from '../token/token.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../../utils/is-dev.util';
import * as ms from 'ms';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UserService {
  private readonly COOKIE_DOMAIN: string;
  private readonly REFRESH_EXPIRES_IN: string;
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly roleService: RolesService,
  ) {
    this.COOKIE_DOMAIN = this.configService.getOrThrow<string>('cookie_domain');
    this.REFRESH_EXPIRES_IN =
      this.configService.getOrThrow<string>('jwt_refresh_token');
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }

  async isValidPassword(
    passwordDto: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordDto, password);
  }
  async register(res, createUserDto: RegisterUserDto) {
    const user: User = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hash: string = await this.hashPassword(createUserDto.password);

    const newUser: User = await this.userModel.create({
      ...createUserDto,
      password: hash,
    });

    const role: Role = await this.roleService.getRoleByValue('ADMIN');

    await newUser.$set('roles', role.id);

    const token: string = await this.auth(res, newUser);

    delete (newUser as any).dataValues.password;

    return {
      user: newUser,
      token,
    };
  }

  async login(res: Response, loginDto: LoginUserDto) {
    const user: User = await this.userModel.findOne({
      where: { email: loginDto.email },
      include: {
        all: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword: boolean = await this.isValidPassword(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new NotFoundException('Пользователь не найден');
    }

    const token: string = await this.auth(res, user);

    delete (user as any).dataValues.password;

    return {
      user,
      token,
    };
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', '0s');

    return true;
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new NotFoundException('Недействительный refresh token');
    }

    const payload = await this.tokenService.verifyToken(refreshToken);

    if (payload) {
      const user: User = await this.userModel.findOne({
        where: {
          id: payload.id,
          email: payload.email,
        },
        include: {
          all: true,
        },
      });

      if (!user) throw new NotFoundException('Пользователь не найден');

      const token: string = await this.auth(res, user);

      delete (user as any).dataValues.password;

      return {
        user,
        token,
      };
    }
  }

  private async auth(res: Response, user: User): Promise<string> {
    const { accessToken, refreshToken } =
      await this.tokenService.generateToken(user);

    this.setCookie(res, refreshToken, this.REFRESH_EXPIRES_IN);

    return accessToken;
  }

  private setCookie(res: Response, value: string, days: string) {
    const maxAge: number = ms(days as ms.StringValue);

    if (maxAge === undefined || maxAge === null) {
      throw new Error(
        `❌ Неверный формат JWT_REFRESH_TOKEN: "${this.REFRESH_EXPIRES_IN}". Пример: "7d", "24h", "30m"`,
      );
    }

    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      maxAge,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  async validate(id: string, email: string) {
    const user: User = await this.userModel.findOne({ where: { id, email } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async getUsers() {
    return await this.userModel.findAll({ include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
