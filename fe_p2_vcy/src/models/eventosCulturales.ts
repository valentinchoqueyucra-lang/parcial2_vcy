import type { Recinto } from './recinto'

export type EstadoEvento = 'Programado' | 'Agotado' | 'Cancelado'
export interface EventosCulturales {
  id: number
  id_recinto: number
  recinto: Recinto
  titulo: string
  artista_principal: string
  duracion_minutos: number
  precio_entrada: number
  fecha_evento: Date
  estado: EstadoEvento
}
