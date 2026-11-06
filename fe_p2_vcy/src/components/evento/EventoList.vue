<script setup lang="ts">
import type { EventosCulturales } from '@/models/eventosCulturales'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'eventos_culturales'
const eventos = ref<EventosCulturales[]>([])
const busqueda = ref<string>('')
const eventoDelete = ref<EventosCulturales | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

const emit = defineEmits(['edit'])

async function obtenerLista() {
  eventos.value = await http.get(ENDPOINT).then((response) => response.data)
}

const eventosFiltrados = computed(() => {
  return eventos.value.filter(
    (evento) =>
      evento.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      evento.artista_principal.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      evento.precio_entrada.toString().includes(busqueda.value),
  )
})

function emitirEdicion(evento: EventosCulturales) {
  emit('edit', evento)
}

function mostrarEliminarConfirm(evento: EventosCulturales) {
  eventoDelete.value = evento
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${eventoDelete.value?.id}`)
  await obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar recinto..." />
    </InputGroup>
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Titulo</th>
          <th>Recinto</th>
          <th>Artista Principal</th>
          <th>Duración (minutos)</th>
          <th>Precio de Entrada</th>
          <th>Fecha del Evento</th>
          <th>Estado</th>
          <th>Modalidad Ingreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(evento, index) in eventosFiltrados" :key="evento.id">
          <td>{{ index + 1 }}</td>
          <td>{{ evento.titulo }}</td>
          <td>{{ evento.recinto?.nombre }}</td>
          <td>{{ evento.artista_principal }}</td>
          <td>{{ evento.duracion_minutos }}</td>
          <td>{{ evento.precio_entrada }}</td>
          <td>{{ evento.fecha_evento }}</td>
          <td>{{ evento.estado }}</td>
          <td>{{ evento.modalidad_ingreso }}</td>

          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(evento)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(evento)"
            />
          </td>
        </tr>
        <tr v-if="eventosFiltrados.length === 0">
          <td colspan="8">No hay eventos disponibles.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
