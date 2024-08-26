<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="novaTarefa" typye="text" placeholder="Insira uma nova tarefa" />
        <button>add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTarefaStore } from '../stores/TarefaStore'

const tarefaStore = useTarefaStore()

const novaTarefa = ref("")

const handleSubmit = async () => {
    if (novaTarefa.value) {
        const data = {
            // id: Math.floor(Math.random() * 1000),
            titulo: novaTarefa.value,
            favoritado: false
        }

        await tarefaStore.adicionar(data)
        novaTarefa.value = ""
        await tarefaStore.listarTarefas()
    }
}
</script>

<style lang="scss" scoped></style>