import { IsNotEmpty, IsString } from 'class-validator';

export class BanUserDto {
  @IsNotEmpty({ message: 'Поле id пользователя пустое' })
  @IsString({ message: 'Поле id пользователя должно быть строкой' })
  userId: string;
  @IsNotEmpty({ message: 'Поле описания пустое' })
  @IsString({ message: 'Поле причины бана должно быть строкой' })
  banReason: string;
}
