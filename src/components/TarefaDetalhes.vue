<template>
    <div class="task">
        <button @click="atualizarStatus" class="mr-4">
            <i :class="{
                '!text-green-600': completada,
                '!text-gray-400': !completada
            }" class="material-icons">check</i>
        </button>
        <input v-model="novoTitulo" @keyup.enter="atualizarTitulo" @blur="atualizarTitulo" type="text"
            placeholder="Digite a sua tarefa"
            class=" placeholder-gray-500 text-gray-700 font-light focus:outline-none block w-full appearance-none leading-normal mr-3">
        <div class="icons">
            <div>
                <i @click="atualizarMarca" class="material-icons" :class="{ 'marcada': marcada }">bookmark</i>
            </div>
            <div>
                <i @click=remover(tarefa.id) class="material-icons">delete</i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTarefaStore } from '../stores/TarefaStore'

const { tarefa } = defineProps(['tarefa'])

const tarefaStore = useTarefaStore()

const atualizarTarefa = tarefaStore.atualizarTarefa
const remover = tarefaStore.remover

const novoTitulo = ref(tarefa.titulo)
const completada = ref(tarefa.completada)
const marcada = ref(tarefa.marcada)

const atualizarStatus = () => {
    completada.value = !completada.value
    atualizarTarefa(tarefa.id, { completada: completada.value })
}

const atualizarTitulo = () => {
    atualizarTarefa(tarefa.id, { titulo: novoTitulo.value })
}

const atualizarMarca = () => {
    marcada.value = !marcada.value
    atualizarTarefa(tarefa.id, { marcada: marcada.value })
}
</script>

<style scoped>
.marcada {
    @apply text-blue-500;
}
</style>