<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="logo">
      <h1>Tarefas Pinia</h1>
    </header>

    <div class="new-task-form"><nova-tarefa-form /></div>

    <div class="filter">
      <button @click="tipoTarefa = 'fazer'">A fazer <span class="badge" :style="{ '--color': '#eab308' }">{{
        contadorPendentes
          }}</span></button>
      <button @click="tipoTarefa = 'marcadas'">Marcadas <span class="badge" :style="{ '--color': '#3b82f6' }">{{
        contadorMarcadas }}</span></button>
      <button @click="tipoTarefa = 'completadas'">Completadas <span class="badge" :style="{ '--color': '#16a34a' }">
          {{ contadorCompletadas }}
        </span>
      </button>
    </div>

    <div class="task-list">
      <div v-if="tipoTarefa === 'fazer'">
        <p v-if="contadorPendentes === 0">Você não tem nenhuma tarefa pendente</p>
        <template v-for="tarefa in pendentes" :key="tarefa.id">
          <tarefa-detalhes :tarefa="tarefa" />
        </template>
      </div>

      <div v-if="tipoTarefa === 'marcadas'">
        <p v-if="contadorMarcadas === 0">Você não tem nenhuma tarefa marcada</p>
        <template v-for="marcada in marcadas" :key="marcada.id">
          <tarefa-detalhes :tarefa="marcada" />
        </template>
      </div>

      <div v-if="tipoTarefa === 'completadas'">
        <p v-if="contadorCompletadas === 0">Você não tem nenhuma tarefa completada</p>
        <template v-for="completada in completadas" :key="completada.id">
          <tarefa-detalhes :tarefa="completada" />
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

const { pendentes, marcadas, completadas, contadorPendentes, contadorMarcadas, contadorCompletadas } = storeToRefs(tarefaStore)

tarefaStore.listarTarefas()

const tipoTarefa = ref('fazer')
</script>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  @apply block;
  margin: 0 auto 2rem;
}

p {
  @apply text-center;
}

.badge {
  @apply inline-flex justify-center items-center bg-blue-300 w-6 h-6 rounded-[50%] text-white text-sm;
  background-color: var(--color)
}

@media (min-width: 1024px) {
  header {
    @apply flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    @apply flex flex-wrap;
    place-items: flex-start;
  }
}
</style>
