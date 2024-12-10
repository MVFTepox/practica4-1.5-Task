<template>
    <div class="m-8 md:m-10 lg:m-12">
        <div class="flex justify-center">
            <h1 class="text-5xl   bg-orange-800 w-2/3 md:w-1/2 text-center rounded-full shadow-2xl shadow-gray-400 text-white ">LOGIN</h1>
        </div>
   
        <PostisLogin></PostisLogin>
    </div>

        
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import PostisLogin from '../components/PostisLogin.vue';

export default defineComponent({
    components: {
        PostisLogin
    }

})
</script>