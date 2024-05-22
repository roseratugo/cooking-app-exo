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

    <nav class="bg-amber-700 ml-6 mr-6 mt-5 rounded-xl border-red-950 dark:bg-gray-900" aria-label="Menu de naviguation">
      <div class="max-w-screen-xl flex items-center justify-between p-2">
        <!-- Utilisez les classes de taille d'écran pour ajuster la taille de l'image -->
        <img src="C:\Users\AdminVia\Downloads\M (1).png" class="h-28 sm:h-auto lg:h-48 rounded-xl" alt="#" />
        <span class="font-serif text-2xl lg:text-5xl">Miam Miam</span>
        <div class="flex items-center space-x-4">
          <!-- Bouton Home -->
          <div class="hidden sm:block">
            <router-link to="/home">
              <button data-tooltip-target="tooltip-home" aria-label="Acceuil" type="button"
                class="inline-flex flex-col items-center justify-center px-5 rounded-s-full dark:hover:bg-gray-800 group">
                <svg class="w-6 h-6 text-black-700 dark:text-gray-400" aria-hidden="true" xmlns="" fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span class="sr-only">Home</span>
              </button>
            </router-link>
            <!-- Bouton All Recipes -->
            <router-link to="/allrecipe">
              <button data-tooltip-target="tooltip-recipes "aria-label="recettes" type="button"
                class="inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800 group ">
                <img class="w-6 h-6 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 "
                  src="C:\Users\AdminVia\Downloads\cook-book.png" alt="Icône de la barre de navigation">
                <span class="sr-only">Recipes</span>
              </button>
            </router-link>
            <!-- Bouton Add Recipe -->
            <router-link v-if="isUserLoggedIn" to="/addrecipe">
              <button data-tooltip-target="tooltip-cooking" aria-label="ajouter une recette" type="button"
                class="inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800 group">
                <img
                  class="w-6 h-6 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  src="C:\Users\AdminVia\Downloads\cooking.png" alt="Icône de la barre de navigation">
                <span class="sr-only">Cooking</span>
              </button>
            </router-link>
            <!-- Bouton Profil -->
            <router-link :to="profileRoute()">
              <button data-tooltip-target="tooltip-profile" aria-label="profil" type="button"
                class="inline-flex flex-col items-center justify-center px-5 rounded-e-full dark:hover:bg-gray-800 group">
                <svg class="w-6 h-6 mb-1 ml-2 mt-5 text-black-500 dark:text-gray-400" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
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
  <router-link to="/sign">
    <button type="button "  aria-label="inscription" class="text-white bg-gradient-to-br mt-10 sm:mt-0 from-red-700 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:px-8 sm:py-3 text-center me-2 mb-2">Nous rejoindre !</button>
  </router-link>
  <router-link to="/connexion">
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



     <div class="md:hidden" aria-label="barre de naviguation sur mobile">
     <!-- Masquer la barre de navigation sur les écrans de taille moyenne et plus grands -->
  <div
    class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-amber-700 border border-red-950 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div :class="{'grid-cols-4': isUserLoggedIn, 'grid-cols-3': !isUserLoggedIn}" class="grid h-full max-w-lg grid-cols-4 gap-2 mx-auto">
      <router-link to="/home">
        <button data-tooltip-target="tooltip-home" type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-s-full  dark:hover:bg-gray-800 group">
          <svg class="w-5 h-5 mb-1 ml-10 mt-5 text-black-500 dark:text-gray-400"
            aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span class="sr-only">Home</span>
        </button>
      </router-link>


      <div id="tooltip-home"aria-label="Accueil" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
       all Recipes
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <router-link to="/allrecipe">
        <button data-tooltip-target="tooltip-recipes " aria-label="recettes" type="button"
          class=" inline-flex flex-col items-center justify-center px-5  dark:hover:bg-gray-800 group ">
          <img
            class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 "
            src="C:\Users\AdminVia\Downloads\cook-book.png" alt="Icône de la barre de navigation">
          <span class="sr-only">Recipes</span>
        </button>
      </router-link>


      <router-link v-if="isUserLoggedIn" to="/addrecipe">
        <button data-tooltip-target="tooltip-cooking" aria-label="ajouter une recette"  type="button"
          class="inline-flex flex-col items-center justify-center px-5  dark:hover:bg-gray-800 group">
          <img
            class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            src="C:\Users\AdminVia\Downloads\cooking.png" alt="Icône de la barre de navigation">
          <span class="sr-only">Cooking</span>
        </button>
      </router-link>
      <div id="tooltip-wallet" role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>


      <router-link :to="profileRoute()">
        <button data-tooltip-target="tooltip-profile" aria-label="profil" type="button"
          class="inline-flex flex-col items-center justify-center px-5 rounded-e-full  dark:hover:bg-gray-800 group">
          <svg class="w-5 h-5 mb-1 ml-2 mt-5 text-black-500 dark:text-gray-400 "
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
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

    <footer class="bg-zinc-400 dark:bg-gray-900 ">
      <div class="mx-auto w-full max-w-screen-xl mt-32">

        <div class="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center" aria-label="droits reserver">© 2024 <a
              href="">Miam Miam™</a>
          </span>
          <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 8 19">
                <path fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only" aria-label="lien vers facebook">Facebook page</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 21 16">
                <path
                  d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span class="sr-only" aria-label="lien vers discord">Discord community</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 17">
                <path fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only" aria-label="lien vers tiwtter">Twitter page</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only" aria-label="lien vers github">GitHub account</span>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                  clip-rule="evenodd" />
              </svg>
              <span class="sr-only" aria-label="lien vers dribble">Dribbble account</span>
            </a>
          </div>
        </div>
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
