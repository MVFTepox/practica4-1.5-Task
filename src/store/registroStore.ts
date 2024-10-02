import { defineStore } from "pinia";

export const registerStore = defineStore("register", {
    state: () => ({
        users: [] as Array<{
            id: number;
            username: string;
            email: string;
            password: string;
        }>,
    }),

    actions: {
        setID(id: number) {
            const user = this.users.find(user => user.username === this.getUsername());
            if (user) user.id = id;
        },
        setUsername(username: string) {
            const user = this.users.find(user => user.username === username);
            if (user) user.username = username;
            else this.users.push({ id: 0, username, email: "", password: "" });
        },

        setEmail(email: string) {
            const user = this.users.find(user => user.username === this.getUsername());
            if (user) user.email = email;
        },

        setPassword(password: string) {
            const user = this.users.find(user => user.username === this.getUsername());
            if (user) user.password = password;
        },

        getEmail() {
            const user = this.users.find(user => user.username === this.getUsername());
            return user ? user.email : "";
        },

        getPassword() {
            const user = this.users.find(user => user.username === this.getUsername());
            return user ? user.password : "";
        },

        getId() {
            const user = this.users.find(user => user.username === this.getUsername());
            return user ? user.id : 0;
        },

        getUsername() {
           if (this.users.length > 0) {
               return this.users[0].username;
           } else {
               return "";
           }
        },
    },

    persist: true,
});
