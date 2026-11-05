import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEventosCulturaleDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del recinto es obligatorio' })
  @IsInt({ message: 'El id del recinto debe ser tipo numérico' })
  readonly id_recinto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser de tipo cadena' })
  @MaxLength(100, { message: 'El título no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined =>
    typeof value == 'string' ? value.trim() : value,
  )
  readonly titulo: string;

  @ApiProperty({
    enum: ['Programado', 'Agotado', 'Cancelado'],
    example: 'Programado',
  })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsString({ message: 'El estado debe ser de tipo cadena' })
  readonly estado: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El artista principal es obligatorio' })
  @IsString({ message: 'El artista principal debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El artista principal no puede tener más de 100 caracteres',
  })
  @Transform(({ value }): string | undefined =>
    typeof value == 'string' ? value.trim() : value,
  )
  readonly artista_principal: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La duración es obligatoria' })
  @Min(1, { message: 'La duración mínima es de 1 minuto' })
  @Max(999, { message: 'La duración no puede superar los 999 minutos' })
  @Transform(({ value }): number | undefined =>
    typeof value == 'number' ? value : undefined,
  )
  readonly duracion_minutos: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio de la entrada es obligatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser numérico y tener máximo 2 decimales' },
  )
  @Min(0.01, { message: 'El precio debe ser mayor a cero' })
  @Max(9999.99, { message: 'El precio no puede superar los 9999.99' })
  @Transform(({ value }): number | undefined =>
    typeof value == 'number' ? value : undefined,
  )
  readonly precio_entrada: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fecha del evento es obligatoria' })
  readonly fecha_evento: Date;
}
