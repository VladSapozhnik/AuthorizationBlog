import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import configuration from '../configurations/configuration';
import { Role } from './roles/entities/role.entity';
import { UserRoles } from './roles/entities/user-roles.entity';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        models: [User, Role, UserRoles],
        autoLoadModels: true,
        synchronize: true,
        logging: true,
      }),
    }),
    UserModule,
    TokenModule,
    RolesModule,
  ],
})
export class AppModule {}
