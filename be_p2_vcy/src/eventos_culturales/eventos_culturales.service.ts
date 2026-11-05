import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventosCulturaleDto } from './dto/create-eventos_culturale.dto';
import { UpdateEventosCulturaleDto } from './dto/update-eventos_culturale.dto';
import { Repository } from 'typeorm';
import { EventosCulturales } from './entities/eventos_culturale.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventosCulturales)
    private readonly eventosCulturalesRepository: Repository<EventosCulturales>,
  ) {}

  async create(
    createEventosCulturaleDto: CreateEventosCulturaleDto,
  ): Promise<EventosCulturales> {
    let eventosCulturales = await this.eventosCulturalesRepository.findOneBy({
      titulo: createEventosCulturaleDto.titulo,
    });
    if (eventosCulturales)
      throw new ConflictException('El evento cultural ya existe');

    eventosCulturales = new EventosCulturales();
    Object.assign(eventosCulturales, createEventosCulturaleDto);
    return this.eventosCulturalesRepository.save(eventosCulturales);
  }

  async findAll(): Promise<EventosCulturales[]> {
    return this.eventosCulturalesRepository.find({
      relations: {
        recinto: true,
      },
      order: {
        titulo: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<EventosCulturales> {
    const eventosCulturales = await this.eventosCulturalesRepository.findOne({
      where: { id },
    });
    if (!eventosCulturales)
      throw new NotFoundException('El evento cultural no existe');
    return eventosCulturales;
  }

  async update(
    id: number,
    updateEventosCulturaleDto: UpdateEventosCulturaleDto,
  ): Promise<EventosCulturales> {
    const eventosCulturales = await this.findOne(id);
    Object.assign(eventosCulturales, updateEventosCulturaleDto);
    return this.eventosCulturalesRepository.save(eventosCulturales);
  }

  async remove(id: number): Promise<EventosCulturales> {
    const eventosCulturales = await this.findOne(id);
    return this.eventosCulturalesRepository.softRemove(eventosCulturales);
  }
}
