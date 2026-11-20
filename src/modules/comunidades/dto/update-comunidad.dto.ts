import { PartialType } from '@nestjs/mapped-types';
import { CreateComunidadDto } from './create-comunidad.dto.js';

export class UpdateComunidadDto extends PartialType(CreateComunidadDto) {}