import { Module } from '@nestjs/common';
import { ComunidadesController } from './comunidades.controller.js';
import { ComunidadesService } from './comunidades.service.js';

@Module({
  controllers: [ComunidadesController],
  providers: [ComunidadesService],
})
export class ComunidadesModule {}