<template>
    <div class="task">
        <h3>{{ tarefa.titulo }}</h3>
        <div class="icons">
            <i @click="favoritar(tarefa.id)" class="material-icons"
                :class="{ 'favoritado': tarefa.favoritado }">favorite</i>
            <i @click=remover(tarefa.id) class="material-icons">delete</i>
        </div>
    </div>
</template>

<script setup>
import { mapActions } from 'pinia'
import { useTarefaStore } from '../stores/TarefaStore'

const { tarefa } = defineProps(['tarefa'])

const tarefaStore = useTarefaStore()

const { favoritar, remover } = mapActions(useTarefaStore, ["favoritar", "remover"])
</script>

<style scoped>
.favoritado {
    color: red
}
</style>