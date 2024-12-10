import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {    
    state: () => ({
        id_user: null as string | null,
        id_note: null as string | null
    }),
})

