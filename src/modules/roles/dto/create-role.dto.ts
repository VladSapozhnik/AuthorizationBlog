import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Поле роли пустое' })
  @IsString({ message: 'Поле роли должно быть строкой' })
  value: string;
  @IsNotEmpty({ message: 'Поле описания пустое' })
  @IsString({ message: 'Поле описания должно быть строкой' })
  description: string;
}
