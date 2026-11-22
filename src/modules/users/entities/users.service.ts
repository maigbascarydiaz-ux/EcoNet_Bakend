import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { isPrismaUniqueConstraintError } from '../../prisma/prisma-error.util.js';
import { hashPassword } from '../../auth/password.util.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email);

    try {
      return await this.prisma.usuarios.create({
        data: {
          nombre: createUserDto.nombre,
          email: createUserDto.email,
          password_hash: await hashPassword(createUserDto.password),
        },
        select: {
          id_usuario: true,
          nombre: true,
          email: true,
          fecha_registro: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una cuenta con ese correo electrónico.',
        );
      }

      throw error;
    }
  }

  findAll() {
    return this.prisma.usuarios.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        email: true,
        fecha_registro: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuarios.findUnique({
      where: { id_usuario: id },
      select: {
        id_usuario: true,
        nombre: true,
        email: true,
        fecha_registro: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`No existe un usuario con id ${id}.`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email, id);
    }

    try {
      return await this.prisma.usuarios.update({
        where: { id_usuario: id },
        data: {
          ...(updateUserDto.nombre !== undefined && {
            nombre: updateUserDto.nombre,
          }),
          ...(updateUserDto.email !== undefined && {
            email: updateUserDto.email,
          }),
          ...(updateUserDto.password !== undefined && {
            password_hash: await hashPassword(updateUserDto.password),
          }),
        },
        select: {
          id_usuario: true,
          nombre: true,
          email: true,
          fecha_registro: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException(
          'Ya existe una cuenta con ese correo electrónico.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.usuarios.delete({
      where: { id_usuario: id },
      select: {
        id_usuario: true,
        nombre: true,
        email: true,
        fecha_registro: true,
      },
    });
  }

  private async validateEmail(email: string, userId?: number) {
    const existingUser = await this.prisma.usuarios.findFirst({
      where: { email },
      select: { id_usuario: true },
    });

    if (existingUser && existingUser.id_usuario !== userId) {
      throw new ConflictException(
        'Ya existe una cuenta con ese correo electrónico.',
      );
    }
  }
}