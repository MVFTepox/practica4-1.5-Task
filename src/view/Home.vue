<template>
    <div class="container mx-auto p-4">
        <!-- Tabs -->
        <div
            class="flex justify-center space-x-4 border-b border-gray-300 pb-4 text-2xl bg-amber-500  rounded-full shadow-2xl shadow-neutral-400">
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="{
                'border-black text-black': activeTab === tab,
                'border-transparent text-orange-700 hover:text-gray-500': activeTab !== tab
            }" class="py-2 px-4 border-b-2 focus:outline-none">
                {{ tab }}
            </button>
            
        </div>
        <div   class="grid grid-cols-8 mt-7 gap-4">

            <button type="button" class="py-2 px-4 border-b-2 focus:outline-none bg-slate-100 rounded-full  " @click="logedOut">Cerrar Sesion</button>

            <p class="text-3xl font-bold col-end-9 col-span-3">Nombre de usuario:{{ username.toLocaleUpperCase() }}</p>
        </div>

        <!-- Tab Contents -->
        <div class="mt-4">
            <div v-if="activeTab === 'Ver Notas'">
                <Postis></Postis>
            </div>
            <div v-if="activeTab === 'Crear Nota'">
                <FormNotas></FormNotas>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Postis from '../components/Postis.vue';
import FormNotas from '../components/formNotas.vue';
import { authStore } from '../store/authStore';
import { registerStore } from '../store/registroStore';
import router from '../Router/Router';


export default defineComponent({
    components: {
        Postis,
        FormNotas,
        history
    },
    data() {
        
        return {
            activeTab: 'Ver Notas',
            tabs: ['Crear Nota', 'Ver Notas', ]
        };
    },
    setup() {
        const auth = authStore();
        const register = registerStore();
        const username = register.getUsername();
        const logedOut = () => {
            auth.logout();
            router.push({ name: 'login' });
        };

        
        return {
            logedOut,
            auth,
            username,
            register,
        };
    }
});
</script>