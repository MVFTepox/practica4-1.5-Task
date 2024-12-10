<template>
    <div class="container mx-8 py-8  mt-8">
        <!-- Tabs -->
        <div class="flex justify-center space-x-4 border-b border-gray-300 pb-4 mx-5 text-xl sm:text-2xl bg-amber-500 rounded-full shadow-2xl shadow-neutral-400">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" 
                :class="{
                    'border-black text-black': activeTab === tab,
                    'border-transparent text-orange-700 hover:text-gray-500': activeTab !== tab
                }" 
                class="py-2 px-4 border-b-2 focus:outline-none">
                {{ tab }}
            </button>
        </div>
        
        <div class="flex flex-col md:flex-row items-center mt-7 ml-7 gap-4">
            <button type="button" class="py-2 px-4 border-b-2 focus:outline-none bg-slate-100 rounded-full" @click="logedOut">
                Cerrar Sesion
            </button>
            <p class="text-xl sm:text-3xl font-bold">Bienvenido: {{ username.toUpperCase() }}</p>
        </div>

        <!-- Tab Contents -->
        <div class="mt-4">
            <div v-if="activeTab === 'Ver Notas'">
                <Postis></Postis>
            </div>
            <div v-if="activeTab === 'Crear Nota'">
                <FormNotas></FormNotas>
            </div>
            <div v-if="activeTab === 'Historial'">
                <history></history>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Postis from '../components/Postis.vue';
import FormNotas from '../components/formNotas.vue';
import { useAuthStore } from '../store/authStore';
import router from '../Router/Router';
import history from '../components/history.vue';
import { useHistoryStore } from '../store/historyStore';
import { useTaskStore } from '../store/TaskForIdUserStore';

export default defineComponent({
    components: {
        history,
        Postis,
        FormNotas,
    },
    data() {
        return {
            activeTab: 'Ver Notas',
            tabs: ['Crear Nota', 'Ver Notas', 'Historial'],
        };
    },
    setup() {
        const taskStore = useTaskStore();
        const historyStore = useHistoryStore();
        const auth = useAuthStore();

        onMounted(async () => {
            await auth.checkAuth();
            if (auth.user) {
                await historyStore.fetchHistoryByUserID(auth.user.id);
                await taskStore.fetchTasksByUserID(auth.user.id);
            }
        });

        const username = auth.user?.nombre || '';
        const logedOut = () => {
            auth.logout();
            router.push({ name: 'login' });
        };

        return {
            logedOut,
            auth,
            username,
        };
    }
});
</script>

<style scoped>
/* Agregar estilos adicionales para la responsividad si es necesario */
</style>
