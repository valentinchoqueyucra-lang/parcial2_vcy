<script setup lang="ts">
import type { EventosCulturales } from '@/models/eventosCulturales'
import type { Recinto } from '@/models/recinto'
import { onMounted } from 'vue'
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, DatePicker, Dialog, InputNumber, InputText, Select } from 'primevue'

const ENDPOINT = 'eventos_culturales'

const estadosEvento = [
  { label: 'Programado', value: 'Programado' },
  { label: 'Agotado', value: 'Agotado' },
  { label: 'Cancelado', value: 'Cancelado' },
]

const recintos = ref<Recinto[]>([])

async function obtenerRecintos() {
  try {
    const response = await http.get('recintos')
    recintos.value = response.data
  } catch (error) {
    console.error('Error al cargar recintos:', error)
  }
}

onMounted(() => {
  obtenerRecintos()
})

const props = defineProps({
  mostrar: Boolean,
  evento: {
    type: Object as () => EventosCulturales,
    default: () => ({}) as EventosCulturales,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const evento = ref<EventosCulturales>({ ...props.evento })

watch(
  () => props.evento,
  (newVal) => {
    evento.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

async function handleSave() {
  try {
    const body = {
      id_recinto: Number(evento.value.id_recinto),
      titulo: evento.value.titulo,
      artista_principal: evento.value.artista_principal,
      duracion_minutos: Number(evento.value.duracion_minutos),
      precio_entrada: Number(evento.value.precio_entrada),
      fecha_evento: evento.value.fecha_evento,
      estado: evento.value.estado,
    }
    if (props.modoEdicion) {
      console.log('ID del evento:', evento.value.id)
      console.log('Datos que se enviarán:', body)

      await http.patch(`${ENDPOINT}/${evento.value.id}`, body)

      console.log('Evento actualizado correctamente')
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    evento.value = {} as EventosCulturales
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 50rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="titulo" class="font-semibold w-3">Titulo</label>
        <InputText
          id="titulo"
          v-model="evento.titulo"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="id_recinto" class="font-semibold w-3">Recinto</label>
        <Select
          id="id_recinto"
          v-model="evento.id_recinto"
          :options="recintos"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccione un recinto"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="artista_principal" class="font-semibold w-3">Artista Principal</label>
        <InputText
          id="artista_principal"
          v-model="evento.artista_principal"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion_minutos" class="font-semibold w-3">Duración (minutos)</label>
        <InputNumber
          id="duracion_minutos"
          v-model="evento.duracion_minutos"
          :min="1"
          :max="999"
          :maxFractionDigits="0"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio_entrada" class="font-semibold w-3">Precio de Entrada</label>
        <InputNumber
          id="precio_entrada"
          v-model="evento.precio_entrada"
          :min="0.01"
          :max="9999.99"
          :minFractionDigits="2"
          :maxFractionDigits="2"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha_evento" class="font-semibold w-3">Fecha del Evento</label>
        <DatePicker
          id="fecha_evento"
          v-model="evento.fecha_evento"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="estado" class="font-semibold w-3">Estado</label>
        <Select
          id="estado"
          v-model="evento.estado"
          :options="estadosEvento"
          optionLabel="label"
          optionValue="value"
          placeholder="Seleccione un estado"
          class="flex-auto"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
