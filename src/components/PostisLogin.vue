<template>
  <div class="flex justify-center mt-8">
    <ul class="list-none overflow-hidden rotate-3 shadow-2xl shadow-black">
      <li>
        <div class="rounded-full bg-red-500 w-5 h-5 relative top-8 left-72 shadow-lg shadow-black"></div>
        <a href="#" class="textdecoration-none decoration-none text-[#000000] bg-[#ffc] block h-[22em] w-[20em] p-8 cursor-pointer">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="Correo" class="text-2xl">Correo</label>
              <input type="email" id="email" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Ingresa tu correo" v-model="email" required>
            </div>
            <div class="mb-3">
              <label for="Contraseña" class="text-2xl">Contraseña</label>
              <input type="password" id="password" class="border-2 border-[#000000] border-solid rounded-md w-full"
                placeholder="Ingresa tu contraseña" v-model="password" required>
            </div>
            <div class="mb-3">
              <input type="submit" value="Iniciar Sesion"
                class="bg-[#000000] text-[#ffc] hover:bg-gray-400 hover:text-[#000000] hover:cursor-pointer w-full rounded-md p-2">
            </div>
          </form>
          <hr class="my-3 border-2 border-[#000000]">
          <div class="mb-3">
            <input type="submit" value="Registrarse" @click="registerer"
              class="bg-[#000000] text-[#ffc] hover:bg-gray-400 hover:text-[#000000] hover:cursor-pointer w-full rounded-md p-2">
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { registerStore } from '../store/registroStore';
import { authStore } from '../store/authStore';
import router from '../Router/Router';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const auth = authStore();
    const register = registerStore();

    const onSubmit = () => {
      // Validación de campos vacíos
      if (email.value === '') {
        alert('Por favor ingresa un correo');
        return;
      }
      if (password.value === '') {
        alert('Por favor ingresa una contraseña');
        return;
      }
      
      // Buscar el usuario en el store
      const user = register.users.find(user => user.email === email.value && user.password === password.value);
      
      // Validación de datos con el store
      if (user) {
        alert('Inicio de sesión exitoso');
        router.push({ name: 'home' });
        auth.login(user.id); // Usar el ID del usuario encontrado
      } else {
        alert('Correo o contraseña incorrectos');
      }
    };

    const registerer = () => {
      router.push({ name: 'register' });
    };

    return {
      email,
      password,
      registerer,
      onSubmit,
    };
  },
});
</script>
