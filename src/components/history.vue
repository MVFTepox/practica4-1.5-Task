<template>
    <div class="flex flex-col items-center mt-8 mx-4 space-y-4">
        <div
            class="text-5xl bg-orange-800 w-11/12 md:w-3/4 lg:w-1/2 text-center rounded-full shadow-2xl shadow-gray-400 text-white py-4">
            HISTORIAL
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Fecha de inicio
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Título
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Contenido
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha de finalización
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <tr v-for="item in userHistory" :key="item.id">
                        <td class="px-6 py-4">
                            {{ item.dateStart }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.title }}
                        </td>
                        <td class="px-6 py-4 overflow-auto">
                            {{ item.content }}
                        </td>
                        <td class="px-6 py-4">
                            {{ item.dateEnd }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-center my-3">
                <button type="button" class="bg-red-500 p-5 rounded-lg text-white hover:bg-red-400 hover:cursor-pointer"
                    @click="delete">
                    Borrar todo
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useHistoryStore } from '../store/historyStore';
import { useAuthStore } from '../store/authStore';

export default defineComponent({
    setup() {
        const historyStore = useHistoryStore();
        const auth = useAuthStore();


        onMounted(async () => {
            await auth.checkAuth();
            if (auth.user) {
                await historyStore.fetchHistoryByUserID(auth.user.id);
            }
        });


        const deleteHistory = async () => {
            if (auth.user?.id) {
                await historyStore.deleteAllHistoryForID(auth.user.id);
            }
        };




        return {
            userHistory: historyStore.history,
            delete: deleteHistory,
        };
    },
});
</script>

<style scoped>
/* Agregar estilos adicionales para la responsividad si es necesario */
</style>
