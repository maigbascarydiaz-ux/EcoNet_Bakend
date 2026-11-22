import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComunidadDto } from '../dto/create-comunidad.dto.js';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface Comunidad extends CreateComunidadDto {
  id_comunidades: number;
}

@Injectable()
export class ComunidadesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateComunidadDto) {
    return this.prisma.comunidades.create({ data: dto });
  }

  findAll() {
    return this.prisma.comunidades.findMany();
  }

  async findOne(id: number) {
    const comunidad = await this.prisma.comunidades.findUnique({
      where: { id_comunidades: id },
    });
    if (!comunidad) {
      throw new NotFoundException(`No se encontró la comunidad con id ${id}`);
    }
    return comunidad;
  }

  async update(id: number, dto: UpdateComunidadDto) {
    await this.findOne(id);
    return this.prisma.comunidades.update({
      where: { id_comunidades: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.comunidades.delete({
      where: { id_comunidades: id },
    });
  }
}