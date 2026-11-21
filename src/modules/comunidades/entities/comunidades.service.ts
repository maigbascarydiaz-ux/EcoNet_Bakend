import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComunidadDto } from '../dto/create-comunidad.dto.js';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto.js';

export interface Comunidad extends CreateComunidadDto {
  id: number;
}

@Injectable()
export class ComunidadesService {
  private readonly comunidades: Comunidad[] = [];
  private nextId = 1;

  create(createComunidadDto: CreateComunidadDto): Comunidad {
    const comunidad: Comunidad = {
      id: this.nextId++,
      nombre: createComunidadDto.nombre,
      descripcion: createComunidadDto.descripcion,
      actividad: createComunidadDto.actividad,
      contacto: createComunidadDto.contacto,
    };
    this.comunidades.push(comunidad);
    return comunidad;
  }

  findAll(): Comunidad[] {
    return [...this.comunidades];
  }

  findOne(id: number): Comunidad {
    const comunidad = this.comunidades.find((item) => item.id === id);
    if (!comunidad) {
      throw new NotFoundException(`No se encontró la comunidad con id ${id}`);
    }
    return comunidad;
  }

  update(id: number, updateComunidadDto: UpdateComunidadDto): Comunidad {
    const comunidad = this.findOne(id);
    if (updateComunidadDto.nombre !== undefined) {
      comunidad.nombre = updateComunidadDto.nombre;
    }
    if (updateComunidadDto.descripcion !== undefined) {
      comunidad.descripcion = updateComunidadDto.descripcion;
    }
    if (updateComunidadDto.actividad !== undefined) {
      comunidad.actividad = updateComunidadDto.actividad;
    }
    if (updateComunidadDto.contacto !== undefined) {
      comunidad.contacto = updateComunidadDto.contacto;
    }
    return comunidad;
  }

  remove(id: number): Comunidad {
    const index = this.comunidades.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`No se encontró la comunidad con id ${id}`);
    }
    return this.comunidades.splice(index, 1)[0]!;
  }
}