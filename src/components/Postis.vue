<template>
  <div>
    <ul>
      <li v-for="item in userTasks" :key="item.id">
        <div class="rounded-full bg-red-500 w-5 h-5 relative top-8 left-48 z-10 shadow-lg shadow-black"></div>

        <a href="#">
          <h2 :class="['text-3xl', { 'line-through': item.isCompleted }]">{{ item.title }}</h2>
          <p :class="['text-xl', { 'line-through': item.isCompleted }]">{{ item.task }}</p>

          <!-- Mostrar fecha de creación -->
          <p class="text-sm">Creado el: {{ formatDate(item.dateStart) }}</p>

          <!-- Mostrar fecha de completado si está completada -->
          <!-- Mostrar fecha de completado si está completada -->
          <p v-if="item.isCompleted && item.dateEnd" class="text-sm text-green-500">
            Se finalizó el: {{ formatDate(item.dateEnd) }}
          </p>

          <hr class="my-3 border border-[#000000]" />
          <div class="mt-3 grid grid-cols-2 gap-3">
            <button type="button" class="bg-green-500 rounded-lg text-white hover:bg-green-400 hover:cursor-pointer"
              @click="completeTask(item.id)" v-if="!item.isCompleted">
              Completa
            </button>
            <button type="button" class="bg-red-500 rounded-lg text-white hover:bg-red-400 hover:cursor-pointer"
              @click="deleteTask(item.id)">
              Borrar
            </button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useTaskForIdUserStore } from "../store/TaskForIdUserStore"; // Asegúrate de que este es el nombre correcto de tu store de tareas

export default defineComponent({
  setup() {
    const taskStore = useTaskForIdUserStore();
    const userTasks = taskStore.getUserTasks();

    // Función para marcar una tarea como completada
    const completeTask = (id: number) => {
      const task = userTasks.find(task => task.id === id);
      if (task && !task.isCompleted) {
        task.isCompleted = true; // Cambiar el estado a completada
        task.dateEnd = new Date(); // Asignar la fecha de finalización
      }
    };

    // Función para eliminar la tarea
    const deleteTask = (id: number) => {
      taskStore.deleteTask(id);
      window.location.reload();
    };

    // Función para formatear la fecha
    const formatDate = (date: Date | null) => {
      if (!date) return ''; // Retorna una cadena vacía si date es null
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      return new Date(date).toLocaleDateString('es-ES', options);
    };

    return {
      userTasks,
      completeTask,
      deleteTask,
      formatDate
    };
  },
});
</script>

<style scoped>
ul,
li {
  list-style: none;
}

ul {
  overflow: hidden;
  padding: 3em;
}

ul li a {
  text-decoration: none;
  color: #000;
  background: #ffc;
  display: block;
  height: 15em;
  width: 15em;
  padding: 1em;
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  transition: transform 0.15s linear;
}

ul li {
  margin: 1.5em;
  float: left;
}

ul li h2 {
  font-weight: bold;
  padding-bottom: 10px;
}

ul li p {
  font-family: "Reenie Beanie", arial, sans-serif;
}

ul li a {
  transform: rotate(-6deg);
}

ul li:nth-child(even) a {
  transform: rotate(4deg);
  position: relative;
  top: 5px;
  background: #cfc;
}

ul li:nth-child(3n) a {
  transform: rotate(-3deg);
  position: relative;
  top: -5px;
  background: #ccf;
}

ul li:nth-child(5n) a {
  transform: rotate(5deg);
  position: relative;
  top: -10px;
}

ul li a:hover,
ul li a:focus {
  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
  transform: scale(1.25);
  position: relative;
  z-index: 5;
}

.line-through {
  text-decoration: line-through;
}

ol {
  text-align: center;
}

ol li {
  display: inline;
  padding-right: 1em;
}

ol li a {
  color: #fff;
}
</style>
