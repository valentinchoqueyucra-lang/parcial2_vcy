import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventosCulturales } from '../../eventos_culturales/entities/eventos_culturale.entity';

@Entity('recintos')
export class Recinto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ciudad: string;

  @Column({ type: 'int', nullable: true })
  anforo_maximo: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => EventosCulturales, (evento) => evento.recinto)
  eventos: EventosCulturales[];
}
