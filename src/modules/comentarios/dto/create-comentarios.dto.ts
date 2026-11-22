import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateComentariosDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @IsString({ message: 'El mensaje debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @Length(2, 200, {
    message: 'El mensaje debe tener entre 2 y 200 caracteres',
  })
  mensaje: string;
}