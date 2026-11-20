import { IsNotEmpty, IsString } from 'class-validator';

export class CreateComunidadDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  actividad!: string;

  @IsString()
  @IsNotEmpty()
  contacto!: string;
}