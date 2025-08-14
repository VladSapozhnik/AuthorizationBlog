import { IsString } from 'class-validator';

export class AuthUserDto {
  @IsString({ message: 'Токен несуществует' })
  token: string;
}
