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
      loginError: false,
      showModal: false,
      isUserLoggedIn: false
    };
  },

  methods: {
    
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    profileRoute() {
      const token = localStorage.getItem('userToken');
      if (token) {
        // Si l'utilisateur est connecté, retourne '/account'
        this.isUserLoggedIn = true;
        this.popupDisplayed = true;
        return '/account';
      } else {
        // Si l'utilisateur n'est pas connecté, retourne '/connexion'
        this.isUserLoggedIn = false;
        return '/connexion';
      }
    },
    hideModal() {
      this.showModal = false;
    },
  },
  mounted() {
  const token = localStorage.getItem('userToken');
  const popupDisplayed = localStorage.getItem('popupDisplayed');
  const hasPopupDisplayed = popupDisplayed === "true";


  if (token && !hasPopupDisplayed) {
      this.showModal = true;
    
      localStorage.setItem('popupDisplayed', true);

      setTimeout(() => {
        this.showModal = false;
      }, 5000);
    }
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

<!-- ******************************************debut modal********************************************* -->

    <div id="popup-modal" style="z-index: 99;" tabindex="5" :class="{ 'hidden': !showModal }" class="fixed inset-0 overflow-y-auto"
      aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>


        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          class="inline-block align-bottom  bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" aria-modal="true" aria-label="message de bienvenue" aria-labelledby="modal-headline">
          <div class="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Connexion réussie
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-300">
                    Petit message pour t'informer que tu es connecté sur ton compte 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="hideModal" aria-label="message bien compris" type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Reçu 5/5 !
            </button>

          </div>
        </div>
      </div>
    </div>

<!-- ***************************************************fin modal********************************************* -->


    <!-- ******************Debut Image *************** -->



    <div class="img">
    <div class="img h-auto md:text-center" aria-label="image">
        <a href="#" class="flex justify-center" aria-label="Lien vers votre destination">
            <img class="rounded-lg h-40 md:h-52 lg:h-64" src="C:\Users\AdminVia\Downloads\M (3).png" alt="Image de description" />
        </a>
    </div>
</div>




    <!-- ******************Fin Image************** -->





    <!-- ***********titre bienvenue************* -->
    <hr class="block md:hidden mr-20 ml-20 h-1 mt-20 my-4 amber-700  border-0 rounded dark:bg-gray-700">

    <div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2" aria-label="En tête">
      <span
        class="text-3xl lg:text-4xl xl:text-5xl font-serif italic p-4 rounded-lg text-amber-700 sm:text-center">Bienvenue
        !</span>
    </div>

    <hr
      class="hidden md:block w-full md:w-3/4 h-1 mt-20 mx-auto my-4 bg-amber-700  border-0 rounded md:my-10 dark:bg-gray-700 md:mx-auto md:px-20 sm:w-10">

    <!-- **************fin titre Bienvenue********** -->










    <!-- ********************debut prez******************* -->
    <div class="flex justify-center" aria-label="Presentation du site">
  <div class="ml- max-w-6xl">
    <a href="#"
      class="block p-9 mt-10 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      aria-labelledby="miam-miam-title">
      <h5 id="miam-miam-title"
        class="mb-4 text-3xl font-bold tracking-tight text-red-950 dark:text-white">Miam Miam c'est quoi ?</h5>
      <p class="font-normal text-lg text-gray-700 dark:text-gray-400">
        Bienvenue sur <strong class="text-red-900">Miam Miam</strong>, votre nouvelle destination culinaire où
        passion, partage et plaisir se rencontrent dans chaque plat. Que vous soyez un cuisinier amateur ou un chef
        chevronné, <strong class="text-red-900">Miam Miam</strong> est la plateforme idéale pour explorer, créer et
        partager des recettes avec des gourmets du monde entier.
        <br><br>
        <strong class="text-red-900">Cuisinez</strong> des recettes délicieuses et inspirantes, allant des classiques
        réconfortants aux innovations modernes, et trouvez l'inspiration pour votre prochain repas, dîner festif ou
        collation rapide. Chaque recette est accompagnée de photos alléchantes, d'instructions détaillées et de
        conseils pratiques pour vous garantir succès et plaisir en cuisine.
        <br><br>
        <strong class="text-red-900">Partagez</strong> vos créations culinaires avec une communauté de passionnés. Que
        vous ayez un penchant pour la pâtisserie, une maîtrise des grillades ou un amour pour les plats végétariens,
        Miam Miam est l'endroit parfait pour montrer vos talents et échanger des idées avec des pairs qui partagent
        votre passion.
        <br><br>
        <strong class="text-red-900">Savourez</strong> les recettes que vous avez préparées et découvrez de nouvelles
        saveurs à travers les créations des autres utilisateurs. Chaque recette est une porte ouverte sur une
        expérience culinaire unique et enrichissante.
        <br><br>
        Chez <strong class="text-red-900">Miam Miam</strong>, nous croyons que cuisiner est plus qu'une nécessité —
        c'est une manière de se connecter, de partager et de savourer la vie. Rejoignez-nous dès aujourd'hui et
        transformez chaque repas en une aventure mémorable.
        <br><br>
        <strong class="text-red-900"> Afin d'acceder à la création de recette, vous devez imperativement crée un compte
          Miam Miam !</strong>
        <br><br>
        <strong class="text-red-900">Cuisiner, Partager, Savourer</strong> - c'est la promesse de Miam Miam. Embarquez
        dans votre prochaine aventure culinaire avec nous !
      </p>
    </a>
  </div>
</div>
+


<div class="hidden md:block">
    <div class="  mt-20 flex flex-col items-center sm:flex-row justify-center gap-4">
      <router-link v-if="!isUserLoggedIn" to="/sign">
    <button type="button" aria-label="inscription" class="text-white bg-gradient-to-br mt-10 sm:mt-0 from-red-700 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:px-8 sm:py-3 text-center me-2 mb-2">Nous rejoindre !</button>
  </router-link>
  <router-link v-if="!isUserLoggedIn" to="/connexion">
    <button type="button" aria-label="connexion" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:px-8 sm:py-3 text-center me-2 mb-2">Se connecter !</button>
  </router-link>
</div>
</div>

    <!-- *********************fin prez******************** -->
    <div
      class= "card w-16 h-16 mx-auto mt-5 hidden md:block bg-white border  rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" aria-label="icone de retour en haut de la page" >
      <img id="goToTop" src="C:\Users\AdminVia\Downloads\fleche-vers-le-haut-chevron.png" alt="Flèche vers le haut"
        class="w-full h-full" />
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

  background: rgb(69, 10, 10);
  background: linear-gradient(90deg, rgba(69, 10, 10, 1) 43%, rgba(180, 83, 9, 1) 57%);
  margin-top: 30px;

}

.picture {
  background-image: url('https://static.wixstatic.com/media/11062b_9e9088d35909492597b65b1fd8b91003~mv2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

}
</style>
