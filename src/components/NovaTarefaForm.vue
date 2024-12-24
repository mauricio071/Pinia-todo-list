<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="novaTarefa" type="text" placeholder="Insira uma nova tarefa" />
        <button class="text-white">Adicionar</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTarefaStore } from '../stores/TarefaStore'
import { v4 } from 'uuid'

const tarefaStore = useTarefaStore()

const novaTarefa = ref("")

const handleSubmit = () => {
    if (novaTarefa.value) {
        const data = {
            id: v4(),
            titulo: novaTarefa.value,
            marcada: false,
            completada: false,
        }
        tarefaStore.adicionar(data)
        novaTarefa.value = ""
        tarefaStore.listarTarefas()
    }
}
</script>

<style lang="scss" scoped></style>