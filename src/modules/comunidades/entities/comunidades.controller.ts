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
import { CreateComunidadDto } from '../dto/create-comunidad.dto.js';
import { UpdateComunidadDto } from '../dto/update-comunidad.dto.js';
import { ComunidadesService } from './comunidades.service.js';

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: ComunidadesService) {}

  @Post()
  create(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadesService.create(createComunidadDto);
  }

  @Get()
  findAll() {
    return this.comunidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComunidadDto: UpdateComunidadDto,
  ) {
    return this.comunidadesService.update(id, updateComunidadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadesService.remove(id);
  }
}