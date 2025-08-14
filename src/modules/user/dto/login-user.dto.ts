import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Поле почта должно быть строкой' })
  @IsNotEmpty({ message: 'Поле почта пустое' })
  @IsEmail({}, { message: 'Поле email некорректное' })
  email: string;
  @IsString({ message: 'Поле пароль должно быть строкой' })
  @IsNotEmpty({ message: 'Поле пароль пустое' })
  @MaxLength(16, { message: 'Поле имя должно содержать меньше 16 символов' })
  @MinLength(6, { message: 'Поле имя должно содержать больше 6 символов' })
  password: string;
}
