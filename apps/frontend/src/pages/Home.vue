<script>
import Modal from '../components/modal.vue'
import axios from 'axios';

export default {
  name: 'UserLogin',
  components: {
    Modal,
  },
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      loginError: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(`http://localhost:3000/register`, this.credentials);
        const token = response.data.token;
        console.log(response);
        localStorage.setItem('userToken', token);
        this.loginError = false;
        this.$router.push('/Home');
      } catch (error) {
        this.loginError = true;
        console.log(error);
      }
    }
  }
};
</script>

<template>
   <div class="BG">
    <div>
<nav class="nav">
  <div class="max-w-screen-xl h-48 flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="#" class="h-40 rounded-3xl" alt="Task Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
    </a>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
        <li>
        <router-link to="/" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Home
          </span>
        </router-link>
      </li>
        <li>
          <li>
        <router-link to="/task" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
           Gestionnaire de tache
          </span>
        </router-link>
      </li>
        </li>
        <button v-show="isButtonVisible" class="button block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" @click="showModal">Ajouter une tâche</button>
      </ul>
    </div>
  </div>
</nav>
</div>

<a href="#" class="flex flex-col mt-10 ml-96 items-center  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-52  md:rounded-none md:rounded-s-lg" src="https://img.freepik.com/photos-gratuite/close-up-intelligent-homme-affaires-vetu-costume-noir-moderne-chemise-blanche-sms-telephone-intelligent-mobile-lumiere-evasee_1258-1279.jpg" alt="">
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bievenue sur FlowTask </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">FlowTask" est une plateforme de gestion des tâches en ligne, offrant une expérience conviviale et des fonctionnalités puissantes pour organiser, suivre et collaborer sur vos tâches personnelles et professionnelles.</p>
    </div>
</a>



<form class="max-w-sm mx-auto mt-20 mb-20  border-2 border-indigo-600" @submit.prevent="handleLogin">
        <div v-if="loginError" class="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          <span class="font-medium">Erreur de connexion !</span> Veuillez vérifier vos informations.
        </div>
  <div class="mb-5 ">
    <label for="username" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Votre Pseudo</label>
    <input v-model="credentials.username" type="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Je suis un pseudo ..." required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input v-model="credentials.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connexion</button>
</form>




<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>
</div>



</template>


<style scoped>
.nav {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
}


.BG {
  background: rgb(0, 212, 255);
  background: linear-gradient(90deg, rgba(0, 212, 255, 1) 0%, rgba(9, 9, 121, 1) 50%, rgba(2, 0, 36, 1) 98%);
  height: max;
}
</style>




<!-- ******code Ugo -->
<!--

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-500 to-amber-600">
    <div class="p-5 sm:p-10 max-w-lg w-full space-y-8 bg-white rounded-xl shadow-2xl">
      <div class="text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-extrabold text-gray-900">
          Connexion Hippofact
        </h2>
        <p class="mt-2 text-sm sm:text-base text-gray-600">
          Veuillez entrer vos identifiants pour vous connecter
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="loginError" class="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          <span class="font-medium">Erreur de connexion !</span> Veuillez vérifier vos informations.
        </div>
        <div>
          <label for="username" class="sr-only">Nom d'utilisateur</label>
          <input v-model="credentials.username" type="text" id="username" placeholder="Nom d'utilisateur" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <label for="password" class="sr-only">Mot de passe</label>
          <input v-model="credentials.password" type="password" id="password" placeholder="Mot de passe" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm">
        </div>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Se Connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const urlAPI = import.meta.env.VITE_APP_API_URL;

export default {
  name: 'UserLogin',
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      loginError: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(`${urlAPI}/company/login`, this.credentials);
        const token = response.data.token;
        const refresh_token = response.data.refreshToken; // Stockage du refresh token
        localStorage.setItem('userToken', token);
        localStorage.setItem('refreshToken', refresh_token); // Stockage du refresh token
        this.loginError = false;
        this.$router.push('/');
      } catch (error) {
        this.loginError = true;
      }
    }
  }
};
</script> -->
