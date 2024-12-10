import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Array<{
            id: string;
            userID: string;
            title: string;
            content: string;
            dateStart: string;
            dateEnd: string | null;
            isComplete: boolean;
        }>,
        task: null as {
            id: string;
            userID: string;
            title: string;
            content: string;
            dateStart: string;
            dateEnd: string | null;
            isComplete: boolean;
        } | null,

        userID: null as string | null
    }),
    actions: {
        async createTask(title: string, content: string) {
            const authStore = useAuthStore();
            const userID = authStore.user?.id || '';
            const dateStart = new Date().toISOString();
            const dateEnd = null;
            const isComplete = false;

            if (!userID) {
                console.error('Error: el usuario no está autenticado');
                return;
            }
            console.log(userID, title, content, dateStart, dateEnd, isComplete);
            try {
                const response = await fetch('http://localhost:3000/api/task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID,
                        title,
                        content,
                        dateStart,
                        dateEnd,
                        isComplete,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Error creando tarea');
                }

                const data = await response.json();
                this.tasks.push(data);
            } catch (error) {
                console.error('Error en createTask:', error);

            }
        },

        async fetchTasks() {
            try {
                const response = await fetch('http://localhost:3000/api/task');
                if (!response.ok) {
                    throw new Error('Error obteniendo tareas');
                }
                const data = await response.json();
                this.tasks = data;
            } catch (error) {
                console.error('Error en fetchTasks:', error);
            }
        },

        async fetchTasksByUserID(userID: string) {
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${userID}`);
                if (!response.ok) {
                    throw new Error(`Error obteniendo tareas del usuario con ID ${userID}`);
                }
                const data = await response.json();
                this.tasks = data;
            } catch (error) {
                console.error('Error en fetchTasksByUserID:', error);
            }
        },

        async updateTask(id: string, dateEnd: string | null, isComplete: boolean) {
            try {
                const { title, content, dateStart } = this.task || {};
                const response = await fetch(`http://localhost:3000/api/task/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        dateStart,
                        dateEnd,
                        isComplete,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error actualizando tarea con ID ${id}`);
                }

                const data = await response.json();
                this.tasks = this.tasks.map(task => (task.id === id ? data : task));
            } catch (error) {
                console.error('Error en updateTask:', error);
            }
        },

        //BORRAR TAREA PERO SIN  BORRAR EL HISTORIAL 
        async deleteTask(id: string) {
            try {
                const response = await fetch(`http://localhost:3000/api/task/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Error eliminando tarea con ID ${id}`);
                }
                   
                this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (error) {
                console.error('Error en deleteTask:', error);
            }
        },
    },
}

);
