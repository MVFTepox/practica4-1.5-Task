<template>
  <div >
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <li v-for="item in userTasks" :key="item.id">
        <div class="rounded-full bg-red-500 w-5 h-5 relative top-8 left-48 z-10 shadow-lg shadow-black"></div>

        <a href="#">
          <h2 :class="['text-3xl', { 'line-through': item.isComplete }]">{{ item.title }}</h2>
          <p :class="['text-xl', { 'line-through': item.isComplete }]">{{ item.content }}</p>

          <p class="text-sm">Creado el: {{ formatDate(item.dateStart) }}</p>
          
          <p v-if="item.isComplete && item.dateEnd" class="text-sm text-green-500">
            Se finalizó el: {{ formatDate(item.dateEnd) }}
          </p>

          <hr class="my-3 border border-[#000000]" />
          <div class="mt-3 grid grid-cols-2 gap-3">
            <button type="button" class="bg-green-500 rounded-lg text-white hover:bg-green-400 hover:cursor-pointer"
              @click="completeTask(item.id)" v-if="!item.isComplete">
              Completar
            </button>
            <button type="button" class="bg-red-500 rounded-lg text-white hover:bg-red-400 hover:cursor-pointer"
              @click="Borrar(item.id)">
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
import { useTaskStore } from "../store/TaskForIdUserStore";
import {useAuthStore} from "../store/authStore";
import { useHistoryStore } from "../store/historyStore";
import {useUserStore} from "../store/userStoire";

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();
    const auth = useAuthStore();
    const historyStore = useHistoryStore();
    const userStore = useUserStore();

    userStore.id_user = "hsdgagdhjkagdhjk";
    
    const userTasks = taskStore.tasks;

    function createhistory(userID: string, title: string, content: string, dateStart: string, dateEnd: string | null) {
      historyStore.createHistory(userID, title, content, dateStart, dateEnd);
      console.log(historyStore.history);
    }

    const completeTask = (id: string) => {
      const task = taskStore.tasks.find((task) => task.id === id);
      if (task) {
        task.id = id;
        task.isComplete = true;
        task.dateEnd = new Date().toISOString();
        taskStore.updateTask(task.id, task.dateEnd, task.isComplete);
        createhistory(task.userID, task.title, task.content, task.dateStart, task.dateEnd);        
      }
    };

    const Borrar = (id: string) => {
      taskStore.deleteTask(id);
      window.location.reload();
    };


    const formatDate = (date: string | null) => {
      if (!date) return "";
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return new Date(date).toLocaleDateString("es-ES", options);
    };

    return {
      userTasks,
      completeTask,
      Borrar,
      formatDate,
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
