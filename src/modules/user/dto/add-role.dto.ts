import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDto {
  @IsNotEmpty({ message: 'Поле роли пустое' })
  @IsString({ message: 'Поле роли должно быть строкой' })
  value: string;
  @IsNotEmpty({ message: 'Поле id пользователя пустое' })
  @IsString({ message: 'Поле id пользователя должно быть строкой' })
  userId: string;
}
