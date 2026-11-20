import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateComentariosDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  mensaje!: string;
}