import { PartialType } from '@nestjs/mapped-types';
import { CreateComentariosDto } from './create-comentarios.dto.js';

export class UpdateComentariosDto extends PartialType(CreateComentariosDto) {}