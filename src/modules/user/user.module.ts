import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Role } from '../roles/entities/role.entity';
import { UserRoles } from '../roles/entities/user-roles.entity';
import { RolesModule } from '../roles/roles.module';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    TokenModule,
    PassportModule,
    RolesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
