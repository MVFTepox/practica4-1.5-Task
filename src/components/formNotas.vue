<template>
    <div class="flex justify-center mt-8">
        <ul class="list-none overflow-hidden -rotate-3 shadow-2xl hover:-rotate-0 shadow-black ">
            <li>
                <div
                    class="rounded-full bg-red-500 w-5 h-5 relative top-8 left-72 shadow-lg shadow-black hover:left-80 ">
                </div>
                <a href="#"
                    class="textdecoration-none decoration-none text-[#000000] bg-[#ffc] block h-auto w-[20em] p-8 hover:w-[22em] hover:h-auto  ">
                    <form action="">
                        <div class="mb-3">
                            <label for="text " class="text-2xl">Titulo de la nota</label>
                            <input type="text" name="" id=""
                                class="border-2 border-[#000000] border-solid rounded-md w-full"
                                placeholder=" Ejp. Limpiar tu cuarto" v-model="Title">
                        </div>
                        <div class="mb-3">
                            <label for="text " class="text-2xl">Contenido de la nota</label>
                            <textarea name="" id="" placeholder=" Ejp. Limpiar tu cuarto"
                                class="border-2 border-[#000000] border-solid rounded-md w-full"
                                v-model="Content"></textarea>
                        </div>

                        <div class="mb-3">
                            <input type="button" value="Crear Nota"
                                class="bg-[#000000] text-[#ffc] hover:bg-gray-400 hover:text-[#000000] hover:cursor-pointer w-full rounded-md p-2" @click="onSubmit">
                        </div>
                    </form>
                </a>
            </li>
        </ul>
    </div>
</template>

<script  lang="ts">
import { defineComponent, ref } from 'vue';
import { useTaskForIdUserStore } from '../store/TaskForIdUserStore';

export default defineComponent({
    name: 'FormNotas',

    setup() {
        const Title = ref('');
        const Content = ref('');
        const auth = useTaskForIdUserStore();
        const onSubmit = () => {           
            
            if (Title.value === '') {
                alert('Ingresa un titulo');
                return;
            }
            if (Content.value === '') {
                alert('Ingresa un contenido');
                return;
            }

            auth.addTask(Title.value, Content.value);
            
            alert('Nota creada exitosamente');
            Title.value = '';
            Content.value = '';
        };
        return {
            Title,
            Content,
            onSubmit
        };
    }
});

</script>