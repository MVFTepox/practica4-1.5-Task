import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
    state: () => ({
        id: 0,
        isLogedIn: false,

    }),
    actions: {

        getid() {
            return this.id
        },
        login(id: number) {
            this.id = id;
            this.isLogedIn = true;
        },
        logout() {
            this.id = 0;
            this.isLogedIn = false;
        }
    },
    persist: true
});