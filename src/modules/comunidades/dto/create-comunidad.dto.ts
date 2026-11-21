import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateComunidadDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  descripcion: string;

  @IsString({ message: 'La actividad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La actividad es obligatoria' })
  actividad: string;

  @IsString({ message: 'El contacto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El contacto es obligatorio' })
  @IsPhoneNumber(undefined, {message: 'El contacto debe ser un número de teléfono válido',})
  contacto: string;
}