import { defineStore } from "pinia";

export const useTarefaStore = defineStore("tarefas", {
    state: () => ({
        tarefas: [],
        isLoading: false
    }),
    actions: {
        async listarTarefas() {
            this.isLoading = true
            const data = await fetch('http://localhost:3000/tarefas')
                .then((response) => response.json())
            this.tarefas = data
            this.isLoading = false
        },
        async favoritar(id) {
            const favorito = this.tarefas.find((item) => item.id === id)
            favorito.favoritado = !favorito.favoritado
            const data = await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: "PATCH",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ favoritado: favorito.favoritado })
            })
        },
        async adicionar(data) {
            this.tarefas.push(data)
            await fetch("http://localhost:3000/tarefas", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })
        },
        async remover(id) {
            await fetch(`http://localhost:3000/tarefas/${id}`, {
                method: "DELETE",
            })
            const idx = this.tarefas.findIndex((item) => item.id === id)
            this.tarefas.splice(idx, 1)

            // this.tarefas = this.tarefas.filter((item) => item.id !== id)
        }
    },
    getters: {
        favoritos() {
            return this.tarefas.filter((item) => item.favoritado)
        },
        contadorFavoritos() {
            // return this.tarefas.filter((item) => item.favoritado).length

            return this.tarefas.reduce((total, item) => { return item.favoritado ? total += 1 : total }, 0)
        },
        contadorTarefas() {
            return this.tarefas.length
        }
    },
    persist: true
})