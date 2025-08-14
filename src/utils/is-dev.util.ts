import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService): boolean =>
  configService.getOrThrow('node_env') === 'development';
