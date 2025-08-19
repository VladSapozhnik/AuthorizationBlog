import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TokenService {
  private readonly REFRESH_EXPIRES_IN: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.REFRESH_EXPIRES_IN =
      this.configService.getOrThrow<string>('jwt_refresh_token');
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.REFRESH_EXPIRES_IN,
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
