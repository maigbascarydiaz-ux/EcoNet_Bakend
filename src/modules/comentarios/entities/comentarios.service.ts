import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComentariosDto } from '../dto/create-comentarios.dto.js';
import { UpdateComentariosDto } from '../dto/update-comentarios.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createComentariosDto: CreateComentariosDto) {
    return this.prisma.comentarios.create({
      data: createComentariosDto,
    });
  }

  findAll() {
    return this.prisma.comentarios.findMany();
  }

  async findOne(id: number) {
    const comentario = await this.prisma.comentarios.findUnique({
      where: { id_comentarios: id },
    });
    if (!comentario) {
      throw new NotFoundException(`No se encontró el comentario con id ${id}`);
    }
    return comentario;
  }

  async update(id: number, updateComentariosDto: UpdateComentariosDto) {
    await this.findOne(id);

    return this.prisma.comentarios.update({
      where: { id_comentarios: id },
      data: updateComentariosDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.comentarios.delete({
      where: { id_comentarios: id },
    });
  }
}