import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SequelizeModule.forFeature([User]), TokenModule, PassportModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
