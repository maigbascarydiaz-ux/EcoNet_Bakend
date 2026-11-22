import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateComentariosDto } from '../dto/create-comentarios.dto.js';
import { UpdateComentariosDto } from '../dto/update-comentarios.dto.js';
import { ComentariosService } from './comentarios.service.js';

@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  create(@Body() createComentariosDto: CreateComentariosDto) {
    return this.comentariosService.create(createComentariosDto);
  }

  @Get()
  findAll() {
    return this.comentariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comentariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComentariosDto: UpdateComentariosDto,
  ) {
    return this.comentariosService.update(id, updateComentariosDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comentariosService.remove(id);
  }
}