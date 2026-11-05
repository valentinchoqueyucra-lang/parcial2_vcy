import { Module } from '@nestjs/common';
import { EventosCulturalesService } from './eventos_culturales.service';
import { EventosCulturalesController } from './eventos_culturales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosCulturales } from './entities/eventos_culturale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventosCulturales])],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
})
export class EventosCulturalesModule {}
