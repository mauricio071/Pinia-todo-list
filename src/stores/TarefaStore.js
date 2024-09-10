import { defineStore } from "pinia";

export const useTarefaStore = defineStore("tarefas", {
    state: () => ({
        tarefas: [],
        isLoading: false
    }),
    actions: {
        listarTarefas() {
            return this.tarefas;
        },
        adicionar(data) {
            this.tarefas.unshift(data);
        },
        atualizarTarefa(id, update) {
            const tarefa = this.tarefas.find((item) => item.id === id);
            const tarefaIdx = this.tarefas.findIndex((item) => item.id === id);

            if (tarefa) {
                Object.assign(tarefa, update);
                this.tarefas[tarefaIdx] = tarefa;
            } else {
                console.log(`Tarefa com ID ${id} não encontrada.`);
            }
        },
        remover(id) {
            const idx = this.tarefas.findIndex((item) => item.id === id);
            if (idx !== -1) {
                this.tarefas.splice(idx, 1);
            } else {
                console.log(`Tarefa com ID ${id} não encontrada.`);
            }
        }
    },
    getters: {
        pendentes() {
            return this.tarefas?.filter((item) => !item.completada);
        },
        marcadas() {
            return this.tarefas?.filter((item) => item.marcada);
        },
        completadas() {
            return this.tarefas?.filter((item) => item.completada);
        },

        contadorPendentes() {
            return this.tarefas?.reduce((total, item) => !item.completada ? total + 1 : total, 0);
        },
        contadorMarcadas() {
            return this.tarefas?.reduce((total, item) => item.marcada ? total + 1 : total, 0);
        },
        contadorCompletadas() {
            return this.tarefas?.reduce((total, item) => item.completada ? total + 1 : total, 0);
        },
    },
    persist: {
        enabled: true
    }
});

