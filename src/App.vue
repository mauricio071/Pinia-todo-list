<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="logo">
      <h1>Tarefas Pinia</h1>
    </header>

    <div class="new-task-form"><nova-tarefa-form /></div>

    <nav class="filter">
      <button @click="tipoTarefa = 'todas'">Todas as tarefas</button>
      <button @click="tipoTarefa = 'favoritos'">Favoritos</button>
    </nav>

    <div v-if="isLoading" class="loading">
      Carregando...
    </div>

    <div v-else class="task-list">
      <div v-if="tipoTarefa === 'todas'">
        <p>Você tem {{ contadorTarefas }} tarefas a fazer </p>
        <template v-for="tarefa in tarefas" :key="tarefa.id">
          <tarefa-detalhes :tarefa="tarefa" />
        </template>
      </div>

      <div v-if="tipoTarefa === 'favoritos'">
        <p>Você tem {{ contadorFavoritos }} tarefas favoritadas a fazer</p>
        <template v-for="favoritado in tarefaStore.favoritos" :key="favoritado.id">
          <tarefa-detalhes :tarefa="favoritado" />
        </template>
      </div>
    </div>
  </main>
</template>

<script setup>
import TarefaDetalhes from './components/TarefaDetalhes.vue';
import { useTarefaStore } from './stores/TarefaStore'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import NovaTarefaForm from './components/NovaTarefaForm.vue';
components: { TarefaDetalhes, NovaTarefaForm }

const tarefaStore = useTarefaStore()

const { tarefas, isLoading, contadorTarefas, contadorFavoritos } = storeToRefs(tarefaStore)

tarefaStore.listarTarefas()

const tipoTarefa = ref('todas')
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
