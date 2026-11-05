import { PartialType } from '@nestjs/swagger';
import { CreateEventosCulturaleDto } from './create-eventos_culturale.dto';

export class UpdateEventosCulturaleDto extends PartialType(CreateEventosCulturaleDto) {}
