import { defineStore } from 'pinia';
import { useTaskStore } from './TaskForIdUserStore';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as {
            id: string;
            nombre: string;
            email: string;
        } | null,
        isLoggedIn: false,
    }),
    actions: {
        async register(nombre: string, email: string, password: string) {
            console.log(nombre, email, password);
            try {
                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        email,
                        password,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error en API:', errorData);
                    throw new Error(errorData.message || 'Error registrando usuario');
                }

                const data = await response.json();
                this.user = data;
                this.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error en register:', error);
            }
        },
        async login(email: string, password: string) {
            try {
                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error en API:', errorData);
                    throw new Error(errorData.message || 'Error obteniendo usuarios');
                }

                const users = await response.json();

                const foundUser = users.find((u: any) => u.email === email);

                if (!foundUser || foundUser.password !== password) {
                    throw new Error('Credenciales inválidas');
                }

                // Actualiza el estado global
                this.user = foundUser
                this.isLoggedIn = true;
                console.log('Usuario autenticado:', this.user?.id);
                const taskStore = useTaskStore();
                await taskStore.fetchTasksByUserID(foundUser.id);

                // Almacena el usuario en localStorage
                localStorage.setItem('user', JSON.stringify(this.user));
                console.log('Usuario autenticado:', this.user);
            } catch (error) {
                console.error('Error en login:', error);
            }
        },
        logout() {
            this.user = null;
            this.isLoggedIn = false;
            localStorage.removeItem('user');

            const taskStore = useTaskStore();
            taskStore.tasks = [];

            console.log('Sesión cerrada. Estado reiniciado.');
        },
        checkAuth() {
            const user = localStorage.getItem('user');
            if (user) {
                this.user = JSON.parse(user);
                this.isLoggedIn = true;
            } else {
                this.user = null;
                this.isLoggedIn = false;
            }
        },

        async fetchUsers() {
            try {
                const response = await fetch('http://localhost:3000/api/user',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Error obteniendo usuarios');
                }
                const data = await response.json();
                return data;
                
            } catch (error) {
                console.error('Error en fetchUsers:', error);
            }
        },
    },
});
