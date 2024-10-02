<template>
    <div class="flex justify-center mt-8">
        <div class="text-5xl bg-orange-800 w-1/2 text-center rounded-full shadow-2xl shadow-gray-400 text-white ">REGISTRO</div>
    </div>
    <PostisRegister class="mt-8"></PostisRegister>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostisRegister from '../components/PostisRegister.vue';
export default defineComponent({
    components: {
        PostisRegister
    }

})
</script>