import { defineStore } from "pinia";
import { authStore } from "./authStore"; // Asegúrate de que este es el nombre correcto de tu store de autenticación.

interface Task {
  id: number;
  title: string;
  task: string;
  userId: number;
  dateStart: Date;
  dateEnd: Date | null;
  isCompleted: boolean;
  isDeleted: boolean; // Agregamos esta propiedad
}

export const useTaskForIdUserStore = defineStore("taskForIdUser", {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    // Añadir una nueva tarea asociada a un usuario
    addTask(title: string, task: string) {
      const userStore = authStore(); // Obtener el store de autenticación
      const userId = userStore.id; // Obtener la id del usuario autenticado
      const id = Date.now(); // Crear un id único basado en el tiempo actual
      const dateStart = new Date();

      this.tasks.push({
        id,
        title,
        task,
        userId,
        dateStart,
        dateEnd: null,
        isCompleted: false, // Inicialmente la tarea no está completada
        isDeleted: false, // Inicialmente no está eliminada
      });
    },

    // Establecer la fecha de finalización y marcar como completada
    completeTask(id: number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task && !task.isCompleted) {
        task.isCompleted = true;
        task.dateEnd = new Date(); // Asignar la fecha de finalización
      }
    },

    // Obtener la ID de la última tarea
    getLastTaskId(): number | null {
      if (this.tasks.length === 0) return null; // Retornar null si no hay tareas
      return this.tasks[this.tasks.length - 1].id; // Retornar la ID de la última tarea
    },

    // Eliminar una tarea (marcar como eliminada)
    deleteTask(id: number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.isDeleted = true; // Marcar como eliminada
        // Aquí puedes agregar lógica para mover la tarea al historial si es necesario.
      }
    },

    // Obtener todas las tareas de un usuario específico
    getUserTasks() {
      const userStore = authStore();
      const userId = userStore.id; // Obtener la id del usuario autenticado
      return this.tasks.filter((task) => task.userId === userId && !task.isDeleted); // Filtrar tareas eliminadas
    },
  },

  persist: true,
});
