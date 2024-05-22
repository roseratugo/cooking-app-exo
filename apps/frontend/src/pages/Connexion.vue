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
      loginData: {
        email: '',
        password: '',
      },
      emailError: false,
      passwordError: false,
      globalError: false,
      globalErrorMessage: '',
      isUserLoggedIn: false
    };
  },
  methods: {
async handleLogin() {
  this.emailError = !this.validateEmail(this.loginData.email);
  this.passwordError = !this.validatePassword(this.loginData.password);

  if (this.emailError || this.passwordError) {
    this.globalError = true;
    this.globalErrorMessage = 'Veuillez vérifier les champs marqués en rouge.';
    return;  // Arrêt de la fonction si des erreurs sont trouvées
  }

  try {
    const response = await axios.post(`http://localhost:3000/login`, {
      email: this.loginData.email,
      password: this.loginData.password
    });
    console.log(response);
    const token = response.data.token;
    localStorage.setItem('userToken', token);
    this.glalError = false;
    this.$router.push('/Home');
  } catch (error) {
    this.globalError = true;
    this.globalErrorMessage = 'Échec de la connexion : ' + error.message;
    console.error('Login failed:', error);
  }
},

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    validatePassword(password) {
      return password.length > 5;
    },
    loginUser() {
      console.log('Login successful', this.loginData);
      // Logique de connexion de l'utilisateur
    },
    goToTop() {
      // Défiler vers le haut de la page
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    profileRoute() {
    const token = localStorage.getItem('userToken');
    if (token) {
      // Si l'utilisateur est connecté, retourne '/account'
      this.isUserLoggedIn = true;
      return '/account';  
    } else {
      // Si l'utilisateur n'est pas connecté, retourne '/connexion'
      this.isUserLoggedIn = false;
      return '/connexion';  
    }
  }
 
  },
  mounted() {
    const goToTopIcon = document.getElementById("goToTop");

    if (goToTopIcon) {
      goToTopIcon.addEventListener("click", this.goToTop);
    }
  }
}
</script>

<template>

<div class="picture">
    <!-- *******************Headbar avec icônes********************* -->
    
    <nav class="bg-amber-700 ml-6 mr-6 mt-5 rounded-xl border-red-950 dark:bg-gray-900">
       <div class="max-w-screen-xl flex items-center justify-between p-2">
         <!-- Utilisez les classes de taille d'écran pour ajuster la taille de l'image -->
         <img src="/image/logo2.png" class="h-28 sm:h-auto lg:h-48 rounded-xl" alt="#" />
         <span class="font-serif text-2xl lg:text-5xl">Miam Miam</span>
         <div class="flex items-center space-x-4">
         <!-- Bouton Home -->
         <div class="hidden sm:block">
           <router-link to="/home">
             <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full dark:hover:bg-gray-800 group">
               <svg class="w-6 h-6 text-black-700 dark:text-gray-400" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 20">
                 <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
               </svg>
               <span class="sr-only">Home</span>
             </button>
           </router-link>
         <!-- Bouton All Recipes -->
         <router-link to="/allrecipe">
             <button data-tooltip-target="tooltip-recipes " type="button" class="inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800 group ">
               <img class="w-6 h-6 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 " src="/image/cook-book.png" alt="Icône de la barre de navigation">
               <span class="sr-only">Recipes</span>
             </button>
           </router-link>
         <!-- Bouton Add Recipe -->
         <router-link v-if="isUserLoggedIn" to="/addrecipe">
              <button data-tooltip-target="tooltip-cooking" type="button"
                class="inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800 group">
                <img
                  class="w-6 h-6 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  src="/image/cooking.png" alt="Icône de la barre de navigation">
                <span class="sr-only">Cooking</span>
              </button>
            </router-link>
       <!-- Bouton Profil -->
       <router-link :to="profileRoute()">
              <button data-tooltip-target="tooltip-profile" type="button"
                class="inline-flex flex-col items-center justify-center px-5 rounded-e-full dark:hover:bg-gray-800 group">
                 <img
                  class="w-6 h-6 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  src="/image/profile-user.png" alt="Icône de la barre de navigation">
                <span class="sr-only">Profile</span>
              </button>
            </router-link>
       </div>
       </div>
     </div>
   </nav>
    <!-- *******************Fin Headbar avec icônes********************* -->
    
    <!-- Supprimer la barre de navigation existante -->
    
    
    
      <!-- *******************phrase d'accroche********** -->
      <div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2" aria-label="En tête">
      <span
        class="text-2xl lg:text-4xl xl:text-4xl font-serif italic p-4 rounded-lg text-amber-700 sm:text-center">Cuisiner,Partager,Savourer
        !</span>
    </div>
    
    <!-- ******************* fin phrase d'accroche********** -->
    
    
    
    
      <!-- ******************Debut Image *************** -->
    
    
    
      <div class="img">
    <div class="img h-auto md:text-center" aria-label="image">
        <a href="#" class="flex justify-center" aria-label="Lien vers votre destination">
            <img class="rounded-lg h-40 md:h-52 lg:h-64" src="C:\Users\AdminVia\Downloads\M (3).png" alt="Image de description" />
        </a>
    </div>
</div>

    
    
      <!-- ******************Fin Image************** -->
     
      <!-- ***********titre connexion************* -->
      <hr class="block md:hidden mr-20 ml-20 h-1 mt-20 my-4 bg-amber-700 border-0 rounded dark:bg-gray-700">

      <div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2">
  <span class="text-3xl lg:text-4xl xl:text-5xl font-serif italic p-4 rounded-lg text-amber-700 sm:text-center">Connexion</span>
</div>

<hr class="hidden md:block w-full md:w-3/4 h-1 mt-20 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700 md:mx-auto md:px-20 sm:w-10">
    
<!-- **************fin titre connexion********** -->





  <!-- ********************card connexion******************* -->

  <hr class="w-48 h-1 mt-20 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

<div class="max-w-4xl p-6 mt-20 ml-2 mr-2 bg-red-950 border border-red-950 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 md:mx-auto">
    <form class="space-y-6" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-amber-700 dark:text-white">Adresse mail</label>
        <input type="email" name="email" id="email" v-model="loginData.email"
               :class="{ 'border-red-500': emailError }"
               class="bg-gray-50 border border-red-950 text-gray-900 text-sm rounded-lg focus:ring-amber-700 focus:border-amber-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
               placeholder="exemple@exemple.com" />
        <span v-if="emailError" class="text-red-500 text-xs">Veuillez entrer une adresse e-mail valide.</span>
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-amber-700 dark:text-white">Mot de passe</label>
        <input type="password" name="password" id="password" v-model="loginData.password"
               :class="{ 'border-red-500': passwordError }"
               placeholder="••••••••"
               class="bg-gray-50 border border-red-950 text-gray-900 text-sm rounded-lg focus:ring-amber-700 focus:border-amber-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        <span v-if="passwordError" class="text-red-500 text-xs">Le mot de passe doit contenir au moins 6 caractères.</span>
      </div>

      <span v-if="globalError" class="text-red-500 text-xs">{{ globalErrorMessage }}</span>

      <button type="submit" class="w-full text-white bg-amber-700 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-700 ">Se connecter</button>
      <router-link to="/sign">
        <div class="text-sm font-medium text-amber-700 dark:text-gray-300">
          <br> Pas de compte ? <p class="text-red-600 hover:underline dark:text-red-500"><br> Crée un compte Miam Miam !</p>
        </div>
        <router-link to="/updatemdp">
            <button
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 mt-5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
              <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Mot de passe oublié
              </span>
            </button>
          </router-link>
      </router-link>
    </form>
  </div>
  <hr class="w-48 h-1 mx-auto my-4 mt-20 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

  <!-- *********************fin card connexion******************* -->







  <div class="card w-16 h-16 mx-auto mt-5 bg-white border  rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <img id="goToTop" src="C:\Users\AdminVia\Downloads\fleche-vers-le-haut-chevron.png" alt="Flèche vers le haut" class="w-full h-full" />
</div>

<!-- *******************navbar************************ -->



<div class="md:hidden"> <!-- Masquer la barre de navigation sur les écrans de taille moyenne et plus grands -->
  <div
    class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-amber-700 border border-red-950 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div :class="{'grid-cols-4': isUserLoggedIn, 'grid-cols-3': !isUserLoggedIn}" class="grid h-full max-w-lg grid-cols-4 gap-2 mx-auto">
      <router-link to="/home">
        <button data-tooltip-target="tooltip-home" type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-s-full  dark:hover:bg-gray-800 group">
          <svg class="w-5 h-5 mb-1 ml-5 mt-5 text-black-500 dark:text-gray-400"
            aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span class="sr-only">Home</span>
        </button>
      </router-link>
      <div id="tooltip-home" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Home
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <router-link to="/allrecipe">
        <button data-tooltip-target="tooltip-recipes " type="button"
          class=" inline-flex flex-col items-center justify-center px-5  dark:hover:bg-gray-800 group ">
          <img
            class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 "
            src="/image/cook-book.png" alt="Icône de la barre de navigation">
          <span class="sr-only">Recipes</span>
        </button>
      </router-link>
      <div id="tooltip-wallet" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <router-link v-if="isUserLoggedIn" to="/addrecipe">
        <button data-tooltip-target="tooltip-cooking" type="button"
          class="inline-flex flex-col items-center justify-center px-5  dark:hover:bg-gray-800 group">
          <img
            class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            src="/image/cooking.png" alt="Icône de la barre de navigation">
          <span class="sr-only">Cooking</span>
        </button>
      </router-link>
      <div id="tooltip-wallet" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <router-link :to="profileRoute()">
        <button data-tooltip-target="tooltip-profile" type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  dark:hover:bg-gray-800 group">
          <img
            class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            src="/image/profile-user.png" alt="Icône de la barre de navigation">

          <span class="sr-only">Profile</span>
        </button>
      </router-link>
      <div id="tooltip-profile" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Profile
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </div>
</div>


    <!-- *******************fin navbar****************** -->

    <!-- ******************Footer debut ***********-->

    <div class="hidden md:block" aria-label="barre de naviguation sur mobile">
<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" class="hover:underline">Miam Miam™</a>. All Rights Reserved.
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


  <!-- *******************Footer fin*************** -->






</div>

</template>


<style scoped>
.img {

    background: rgb(69,10,10);
background: linear-gradient(90deg, rgba(69,10,10,1) 43%, rgba(180,83,9,1) 57%);
  margin-top: 30px;

}
.picture {
    background-image: url('https://static.wixstatic.com/media/11062b_9e9088d35909492597b65b1fd8b91003~mv2.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; 
    
}
</style>




