<template>
  <div class="flex justify-center mt-8">
    <ul class="list-none overflow-hidden -rotate-3 shadow-2xl shadow-black ">
      <li>
        <div class="rounded-full bg-red-500 w-5 h-5 relative top-8 left-72 shadow-lg shadow-black "></div>
        <a href="#" class="textdecoration-none decoration-none text-[#000000] bg-[#ffc] block h-auto w-[20em] lg:w-[20em]  p-8">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="username" class="text-2xl">Nombre de usuario</label>
              <input type="text" id="username" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Ingresa tu nombre de usuario" v-model="username" required>
            </div>
            <div class="mb-3">
              <label for="email" class="text-2xl">Correo</label>
              <input type="email" id="email" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Ingresa tu correo" v-model="email" required>
            </div>
          
            <div class="mb-3">
              <label for="password" class="text-2xl">Contraseña</label>
              <input type="password" id="password" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Ingresa tu contraseña" v-model="password" required>
            </div>
            <div class="mb-3">
              <label for="passwordConfirmation" class="text-2xl">Confirmar Contraseña</label>
              <input type="password" id="passwordConfirmation" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Confirma tu contraseña" v-model="passwordConfirmation" required>
            </div>
            <div class="mb-3 justify-center flex">
              <a href="/login" class=" text-[#3434ff] text-center">volver al pagina de inicio</a>
            </div>
            <div class="mb-3">
              <input type="submit" value="Regístrate"
                class="bg-[#000000] text-[#ffc] hover:bg-gray-400 hover:text-[#000000] hover:cursor-pointer w-full rounded-md p-2">
            </div>
          </form>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref , onMounted} from 'vue';
import router from '../Router/Router';
import { useAuthStore } from '../store/authStore';

export default defineComponent({
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirmation = ref('');

    const auth = useAuthStore();

    onMounted(async () => {
      await auth.fetchUsers();
    })
    const onSubmit = () => {
      if (username.value === '') {
        alert('Por favor ingresa un nombre de usuario');
        return;
      }
      if (email.value === '') {
        alert('Por favor ingresa un correo');
        return;
      }
      if (password.value === '') {
        alert('Por favor ingresa una contraseña');
        return;
      }
      if (passwordConfirmation.value === '') {
        alert('Por favor confirma tu contraseña');
        return;
      }
      if (password.value !== passwordConfirmation.value) {
        alert('Las contraseña no coinciden');
        return;
      }

      auth.register(username.value, email.value, password.value);
      console.log(auth);
      router.push({ name: 'login' });

      
    };

    return {
      username,
      email,
      password,
      passwordConfirmation,
      onSubmit,
    };
  },
});
</script>
