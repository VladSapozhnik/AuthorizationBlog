import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Поле заголовка пустое' })
  @IsString({ message: 'Поле id пользователя должно быть строкой' })
  title: string;
  @IsNotEmpty({ message: 'Поле описание пустое' })
  @IsString({ message: 'Поле id пользователя должно быть строкой' })
  description: string;
  // @IsString({ message: 'Поле картинки должно быть строкой' })
  @IsOptional()
  image: string;
  // @IsNotEmpty({ message: 'Поле id пользователя пустое' })
  // @IsString({ message: 'Поле id пользователя должно быть строкой' })
  // userId: string;
}
