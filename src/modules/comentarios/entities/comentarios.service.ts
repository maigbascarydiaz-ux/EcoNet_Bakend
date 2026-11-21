import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentariosDto } from '../dto/create-comentarios.dto.js';
import { UpdateComentariosDto } from '../dto/update-comentarios.dto.js';

export interface Comentario extends CreateComentariosDto {
  id: number;
}

@Injectable()
export class ComentariosService {
  private readonly comentarios: Comentario[] = [];
  private nextId = 1;

  create(createComentariosDto: CreateComentariosDto): Comentario {
    const comentario: Comentario = {
      id: this.nextId++,
      nombre: createComentariosDto.nombre,
      email: createComentariosDto.email,
      mensaje: createComentariosDto.mensaje,
    };
    this.comentarios.push(comentario);
    return comentario;
  }

  findAll(): Comentario[] {
    return [...this.comentarios];
  }

  findOne(id: number): Comentario {
    const comentario = this.comentarios.find((item) => item.id === id);
    if (!comentario) {
      throw new NotFoundException(`No se encontró el comentario con id ${id}`);
    }
    return comentario;
  }

  update(id: number, updateComentariosDto: UpdateComentariosDto): Comentario {
    const comentario = this.findOne(id);
    if (updateComentariosDto.nombre !== undefined) {
      comentario.nombre = updateComentariosDto.nombre;
    }
    if (updateComentariosDto.email !== undefined) {
      comentario.email = updateComentariosDto.email;
    }
    if (updateComentariosDto.mensaje !== undefined) {
      comentario.mensaje = updateComentariosDto.mensaje;
    }
    return comentario;
  }

  remove(id: number): Comentario {
    const index = this.comentarios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`No se encontró el comentario con id ${id}`);
    }
    return this.comentarios.splice(index, 1)[0]!;
  }
}