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
      recipeId: null,
      recipe: {
         title:"",
         description:"",
         preparation_time:"",
         utensils:"",
         ingredients:"",
         recipe:"",
      },
      newComment: '',
      text: '',
      comments: [],
      loginError: false,
      isUserLoggedIn: false,
      successMessage: '',
      errorMessage: ''
    };
  },

  methods: {

    async fetchCredentials(recipeId) {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios({
            method: "get",
            url: `http://localhost:3000/recipe/${this.recipeId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        });

    console.log(response.data);
    this.recipe = response.data
    return ;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la recette:', error);
    return null; 
  };

},
async addFavorite(recipeId) {
  try {
    const token = localStorage.getItem("userToken");

    const response = await axios({
      method: "post",
      url: `http://localhost:3000/favorite/${recipeId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    this.successMessage = 'Recette ajoutée aux favoris avec succès !';
   
  } catch (error) {
    this.errorMessage = 'Cette recette est déjà dans vos favoris !';
  }
},


async sendComment() {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            console.error("Token non trouvé");
            return;
        }

        const response = await axios({
            method: "get",
            url: "http://localhost:3000/userInfo",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            
        });


        const commentResponse = await axios({
            method: "post",
            url: "http://localhost:3000/comments",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {text: this.newComment, recipeId: this.recipeId }
        });


        const savedComment = commentResponse.data;

        window.location.reload()
    } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire:", error);
    }
},
async fetchComment(recipeId){
  try {

    const token = localStorage.getItem("userToken");4
    console.log(this.recipeId);

if (!token) {
    console.error("Token non trouvé");
    return;
}

const response = await axios({
    method: "get",
    url: `http://localhost:3000/comments/all/${this.recipeId}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    
});
this.comments= response.data;

  } catch (error) {
    console.log(error);
  }
},
formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(); 
    log
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
  },
  truncate(text, limit) {
      if (text.length <= limit) {
        return text;
      }
      return text.substring(0, limit) ;
    },
    showPopup(message) {
    this.popupMessage = message;
    this.isPopupVisible = true;
    setTimeout(() => {
      this.isPopupVisible = false;
    }, 2000); // Fermer automatiquement la fenêtre contextuelle après 2 secondes
  }
  },
  mounted() {
    const recipeId = this.$route.params.id;
    const goToTopIcon = document.getElementById("goToTop");
    
    if (goToTopIcon) {
      goToTopIcon.addEventListener("click", this.goToTop);
    }
     // Récupérer l'ID de la recette depuis l'URL
     this.recipeId = this.$route.params.id;
        // Utiliser l'ID pour charger les détails de la recette depuis la base de données
        this.fetchCredentials(this.recipeID);
        this.fetchComment(this.recipeId)

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
            <img class="rounded-lg h-40 md:h-52 lg:h-64" src="/image/logo.png" alt="Image de description" />
        </a>
    </div>
</div>

   
   
     <!-- ******************Fin Image************** -->
   
   
     <div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2">
  <span class="text-3xl lg:text-4xl xl:text-5xl font-serif italic p-4 rounded-lg text-amber-700 sm:text-center">On essaie ?</span>
</div>
   


<!-- Titre -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center items-center mt-10 mb-10">
    <h1 class="break-words block max-w-sm p-6 ml-2 mr-2 bg-red-950 rounded-lg text-amber-700 font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl whitespace-normal">{{ recipe.title }}</h1>
</div>

<!-- Description -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center">
    <div class="block max-w-lg p-10 ml-2 mr-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class=" mb-2 text-2xl md:text-4xl text-center font-bold tracking-tight text-red-950 dark:text-white">Description</h5>
        <span class=" break-words font-normal md:text-xl text-center text-amber-700 dark:text-gray-400 whitespace-normal">{{ recipe.description }}</span>
    </div>
</div>


<!-- Indicateur de durée -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center">
    <a href="#" class="block max-w-lg p-6 mr-2 ml-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Indicateur de durée</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
        <br>
        <img src="/image/deadline.png" alt="Date Temps de préparation " class="w-6 h-6 mt-2 inline-block">
        <span class=" ml-2 md:text-xl text-amber-700 whitespace-normal" >Temps de préparation :<br> {{ recipe.preparation_time }}<br> </span>
    </a>
</div>

<!-- Ustensiles nécessaires -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center">
    <div class="max-w-lg mx-auto ml-2 mr-2">
        <a href="#" class="block p-4 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex items-center justify-center mb-4">
                <h5 class="text-xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white whitespace-normal">Ustensiles nécessaires</h5>
            </div>
            <div class="flex items-center">
                <img src="/image/spatula.png" alt="Ustensiles nécessaires" class="w-6 h-6 mt-1 inline-block">
                <ul class="flex flex-wrap list-disc ml-8 mt-2 md:text-2xl text-amber-700">
                    <span class="break-words" v-for="utensil in recipe.utensils">{{ utensil }}</span>
                </ul>
            </div>
        </a>
    </div>
</div>


<!-- Ingrédients nécessaires -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center">
    <div class="max-w-xs mx-auto mr-2 ml-2">
        <a href="#" class="block p-4 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex items-center justify-center mb-4">
                <h5 class="text-xl md:text-4xl md:text-center font-bold tracking-tight text-red-950 dark:text-white whitespace-normal">Ingrédients nécessaires</h5>
            </div>
            <div class="flex items-center">
                <img src="/image/diet.png" alt="Ingredients" class="w-6 h-6 mt-1 inline-block">
                <ul class="flex flex-wrap ml-8 mt-2 md:text-2xl text-amber-700 ">
                    <li class="break-words " v-for="ingredient in recipe.ingredients">
                    <span> {{ ingredient }}</span></li>
                </ul>
            </div>
        </a>
    </div>
</div>


<!-- Recette -->
<!-- Recette -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">
<div class="flex justify-center">
    <div class="flex justify-between">
        <a href="#" class="block max-w-lg p-6 ml-2 mr-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl md:text-5xl font-bold text-center tracking-tight text-red-950 dark:text-white">Recette</h5>
            <ul class="list-disc ml-8 mt-2 md:text-xl text-amber-700 ">
                <span class="break-words">{{ recipe.recipe}}</span>
            </ul>
        </a>
    </div>
</div>







<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">


<div class="block max-w-sm p-6 ml-2 mr-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:mx-auto">
    <h5 class="mb-2 text-sm font-bold tracking-tight text-red-950 dark:text-white text-center">Ajustez les proportions en fonction du nombre de personnes.</h5>
</div>

<!-- ****************Debut ajout recette au favoris******************** -->
<div class="block max-w-sm p-6 ml-2 mr-2 mt-5 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:mx-auto" v-if="isUserLoggedIn">
  <button @click="addFavorite(recipe.id)" data-tooltip-target="tooltip-recipes" class="inline-flex flex-col items-center justify-center px-5 dark:hover:bg-gray-800 group">
    <h5 class="mb-2 text-sm font-bold tracking-tight text-red-950 dark:text-white text-center">Ajoute cette recette à tes favoris !</h5>
    <img class="w-5 h-5 mb-1 ml-5 mt-5 text-gray-500 dark:text-gray-400" src="/image/ajouter-aux-favoris.png" alt="Icône de favori">

 <!-- Message de succès -->
 <div v-if="successMessage" class="relative flex justify-center items-center mt-10">
  <div class="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
   focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-white">
    <p>{{ successMessage }}</p>
  </div>
</div>
  <!-- Message d'erreur -->

  <div v-if="errorMessage" class="relative flex justify-center items-center mt-10">
  <div class="text-white bg-gradient-to-br from-orange-400 to-red-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
   focus:ring-orange-200 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
   <p>{{ errorMessage }}</p>
  </div> 
  </div>
   </button>
  </div>




 

<!-- ****************Fin ajout recette au favoris******************** -->


<!-- ********************* Debut commentaire ***************** -->
<hr class="hidden md:block w-full md:w-3/4 h-1 mt-20 mx-auto my-4 bg-amber-700  border-0 rounded md:my-10 dark:bg-gray-700 md:mx-auto md:px-20 sm:w-10">

<div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2" >
  <span class="text-3xl lg:text-4xl xl:text-5xl font-serif italic p-4 rounded-lg text-amber-700 sm:text-center">Espace commentaire</span>
</div>
<hr class="hidden md:block w-full md:w-3/4 h-1 mt-20 mx-auto my-4 bg-amber-700  border-0 rounded md:my-10 dark:bg-gray-700 md:mx-auto md:px-20 sm:w-10">
  



<div class="flex justify-center" v-if="isUserLoggedIn">
    <div class="max-w-4xl mx-auto mt-5 "> 
      <span class="block p-10 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex items-center justify-center mb-4"> 
          <h5 class="text-xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Laissez un commentaire sur la recette !</h5>
        </div>
        <textarea v-model="newComment" class="font-normal text-amber-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Écrivez votre commentaire ici..."></textarea>
        <button @click="sendComment" class="text-white ml-20 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Envoyer</button>
      </span>
    </div>
  </div>

<!-- ***********Fin commentaire ***************** -->


<!-- ******************debut card commentaire********************* -->

<div v-for="comment in comments" :key="comment.id"class="block p-4 md:p-8 mt-10 md:mr-52 md:ml-52 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <!-- Afficher les commentaires -->
  <div class="mt-4">
    <h5 class="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ comment.user.username }}</h5>
    <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1 md:mb-2">{{ formatDate(comment.createdAt) }}</p>
    <p class="font-normal text-sm md:text-base text-gray-700 dark:text-gray-400">{{ comment.text }}</p>
  </div>
</div>




<!-- ***********************fin card commentaire****************** -->

<div
      class="card w-16 h-16 mx-auto mt-5 bg-white border  rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <img id="goToTop" src="/image/fleche-vers-le-haut-chevron.png" alt="Flèche vers le haut"
        class="w-full h-full" />
    </div>


<!-- *****************************************************************fin card recette**************************************************************************************** -->





<!-- **************************************************************navbar********************************************************************************************* -->



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



    <!-- **************************************************************************Footer fin************************************************************************* -->





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
    background-repeat: no-repeat;
    background-attachment: fixed; 
 
}
</style>
