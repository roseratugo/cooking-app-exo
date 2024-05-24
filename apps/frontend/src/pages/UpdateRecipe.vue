<script>
import Modal from '../components/modal.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Modal,
  },
  data() {
    return {
      credentials: {
        title:"",
        description:"",
        preparation_time: "",
        utensils:"",
        ingredients:"",
        recipe:"",
        user_id:"",
        file: "", 
        image_url: "",
     
      },
      loginError: false,
      globalError: false,
      globalErrorMessage: '',
      isUserLoggedIn: false,
      isUploadSuccessVisible: false, 
      uploadSuccessMessage: '',
      showSuccessPopup: false
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

    this.credentials = response.data
    console.log(this.credentials);
    return ;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la recette:', error);
    return null; 
  };

},
   
    async updateRecipe() {
      const token = localStorage.getItem("userToken");

      
  if (!token) {
    console.error("Token non trouvé");
    return;
  }

    // Vérifier si tous les champs requis sont remplis
    if (
    !this.credentials.title.trim() ||
    !this.credentials.description.trim() ||
    !this.credentials.preparation_time ||
    !this.credentials.utensils.trim() ||
    !this.credentials.ingredients.trim() ||
    !this.credentials.recipe.trim()
  ) {
    console.error("Veuillez remplir tous les champs");
    return;
  }
      try {
        const data = {
      title: this.credentials.title,
      description: this.credentials.description,
      preparation_time: this.credentials.preparation_time,
      utensils: this.credentials.utensils,
      ingredients: this.credentials.ingredients,
      recipe: this.credentials.recipe,
      image_url:this.credentials.image_url
    };
        const id = this.$route.params.id;
        const token = localStorage.getItem("userToken");
        const response = await axios({
      method: "put",
      url: `http://localhost:3000/update/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
        console.log(response.data.message);


        this.showSuccessPopup = true;
    this.$emit('recipeAdded');
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
  }
},

    async uploadPhotos() {
      try {
        const formData = new FormData();
        formData.append('photo', this.credentials.file); 

        const response = await axios.post('http://localhost:3000/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

     const image_url = response.data.image_url; 
    console.log('Image uploaded successfully:', image_url);
    this.credentials.image_url = image_url;
    // Afficher le message de confirmation
    console.log(image_url);
    this.uploadSuccessMessage = 'Votre photo a été ajoutée avec succès!';
    this.isUploadSuccessVisible = true;
  } catch (error) {
    console.error('Error uploading image:', error);
    // Gérer les erreurs...
  } 
},

    handleFileChange(event) {
      this.credentials.file = event.target.files[0];
      this.uploadPhotos(); 
    },

    toggleUploadForm() {
      const formUploadPhotos = document.getElementById('formUploadPhotos');
      formUploadPhotos.classList.toggle('hidden');
    },

    goToTop() {
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



    hideErrorMessage() {
      this.globalError = false;
    },
    hideSuccessPopup() {
      this.showSuccessPopup = false;
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
    // Initialisation de l'icône "retour en haut"
    const goToTopIcon = document.getElementById("goToTop");
    if (goToTopIcon) {
      goToTopIcon.addEventListener("click", this.goToTop);
    }

    // Initialisation du bouton "ajouter une photo"
    const btnAddPhoto = document.getElementById('btnAddPhoto');
    if (btnAddPhoto) {
      btnAddPhoto.addEventListener('click', this.toggleUploadForm);
    }
    this.recipeId = this.$route.params.id;

    // Initialisation du formulaire de téléchargement de photos
    const formUploadPhotos = document.getElementById('formUploadPhotos');
    this.fetchCredentials(this.recipeID);
  }
}
</script>



<template>
<div class="picture">
  
   <!-- ********************************************************************************Headbar avec icônes************************************************************************************** -->
    
   <nav class="bg-amber-700 ml-6 mr-6 mt-5 rounded-xl border-red-950 dark:bg-gray-900">
       <div class="max-w-screen-xl flex items-center justify-between p-2">
         <!-- Utilisez les classes de taille d'écran pour ajuster la taille de l'image -->
         <img src="/image/logo2.png" class="h-28 sm:h-auto lg:h-48 rounded-xl" alt="#" />
         <span class="font-serif text-2xl lg:text-5xl">Miam Miam</span>
         <div class="flex items-center space-x-4">
         <!-- Bouton Home -->
         <div class="hidden sm:block">
           <router-link to="/">
             <button data-tooltip-target="tooltip-/" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-s-full dark:hover:bg-gray-800 group">
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
    <!-- ***********************************************************************Fin Headbar avec icônes**************************************************************************************** -->
    

    <!-- **************************************************************************phrase d'accroche****************************************************************************************** -->
    <div class="flex justify-center items-center mt-10 rounded-lg border-amber-700 bg-red-950 ml-2 mr-2"
      aria-label="En tête">
      <span class="text-2xl lg:text-4xl xl:text-4xl font-serif italic p-4 rounded-lg text-amber-700 text-center">
        Cuisiner, Partager, Savourer !
      </span>
    </div>

    <!-- *************************************************************************** fin phrase d'accroche****************************************************************************** -->




  <!-- *************************************************************************************Debut Image *********************************************************************************** -->

  <div class="img">
    <div class="img h-auto md:text-center" aria-label="image">
        <a href="#" class="flex justify-center" aria-label="Lien vers votre destination">
            <img class="rounded-lg h-40 md:h-52 lg:h-64" src="/image/logo.png" alt="Image de description" />
        </a>
    </div>
</div>

  <!-- ************************************************************************************Fin Image************************************************************************************************ -->



  <!-- *************************************************************************************Debut Image *********************************************************************************** -->

  <div class="img">
    <div class="img h-auto md:text-center" aria-label="image">
        <a href="#" class="flex justify-center" aria-label="Lien vers votre destination">
            <img class="rounded-lg h-40 md:h-52 lg:h-64" src="/image/logo.png" alt="Image de description" />
        </a>
    </div>
</div>

  <!-- ******************************************************************************************Fin Image************************************************************************************ -->




    <!-- ******************************************************************************* Card Recette***************************************************************************************** -->

    <hr class="w-48 h-1 mx-auto my-4 mt-10 mb-10 bg-amber-700  border-0 rounded md:my-10 dark:bg-gray-700">

    <form @submit.prevent="updateRecipe">

      <div class="flex justify-center">
    <div class="mr-2 max-w-4xl">
        <!-- Card 0: titre-->
        <label class="block max-w-lg p-10 ml-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 class="mb-2 text-2xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Titre</h1>
            <textarea v-model="credentials.title" class="font-normal text-amber-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Ajoutez un titre ici..."></textarea>
        </label>
    </div>
</div>

<!-- Espacement entre les cartes -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

<div class="flex justify-center">
    <!-- Card 1: description-->
    <label  class="block max-w-lg p-10 ml-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 class="mb-2 text-2xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Description</h1>
        <textarea v-model="credentials.description"class="font-normal text-amber-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Ajoutez une description ici..."></textarea>
    </label>
</div>

<!-- Espacement entre les cartes -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

<div class="flex justify-center">
    <!-- Card 2: Indicateur de durée -->
    <div class="p-10 ml-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 class="mb-2 text-2xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Indicateur de durée</h1>
        <label type="number" for="preparation_time">Temps de préparation :
            <input type="time"   v-model="credentials.preparation_time" class="font-normal text-gray-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Temps de préparation : heure/minute/seconde"></input>
        </label>
    </div>
</div>


<!-- Séparateur horizontal -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">


<div class="flex justify-center">
    <!-- Card 3: Ustensiles nécessaires -->
    <div class="max-w-4xl mx-auto "> 
        <label  class="block p-10 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex items-center justify-center mb-4"> 
                <h1 class="text-xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Ustensiles nécessaires</h1>
            </div>
            <textarea v-model="credentials.utensils" class="font-normal text-amber-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Ajoutez les ustensiles nécessaires ici..."></textarea>
          </label>
    </div>
</div>
<!-- Séparateur horizontal -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

<!-- Card 4: Ingrédients nécessaires -->
<div class="flex justify-center">
    <div class="max-w-3xl mx-auto"> 
        <label  class="block p-10 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="flex items-center justify-center mb-4"> 
                <h1 class="text-xl md:text-4xl font-bold tracking-tight text-red-950 dark:text-white">Ingrédients nécessaires</h1>
            </div>
            <textarea v-model="credentials.ingredients" class="font-normal text-amber-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Ajoutez les ingrédients nécessaires ici..."></textarea>
        </label>
    </div>
</div>

<!-- Séparateur horizontal -->
<hr class="w-48 h-1 mx-auto my-4 bg-amber-700 border-0 rounded md:my-10 dark:bg-gray-700">

<!-- Card 5: Recette -->
<div class="flex justify-center">
    <label  class="block max-w-4xl p-10 ml-2 bg-white border border-red-950 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 class="mb-2 text-2xl md:text-4xl font-bold text-center tracking-tight text-red-950 dark:text-white">Recette</h1>
        <textarea v-model="credentials.recipe" class="font-normal text-gray-700 dark:text-gray-400 resize-none outline-none border-b-2 border-red-950 p-5 w-full md:w-96" placeholder="Ajoutez la recette ici..."></textarea>
    </label>
</div>



<hr class="w-48 h-1 mx-auto my-4 bg-amber-700  border-0 rounded md:my-10 dark:bg-gray-700">



<!-- Conteneur pour l'aperçu de l'image téléchargée -->
<div v-if="isUploadSuccessVisible" class="relative flex justify-center items-center mt-10">
  <div class="bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-white">
    <p>{{ uploadSuccessMessage }}</p>
    <button @click="isUploadSuccessVisible = false" class="absolute top-2 right-2 text-red-600 focus:outline-none">&times;</button>
  </div>
</div>

</form>
<!-- Bouton pour ajouter des photos -->
<div class="flex justify-center items-center mb-20 mt-10 relative">
  <form @submit.prevent="uploadPhotos" id="formUploadPhotos" method="post" enctype="multipart/form-data" class="hidden absolute inset-0 flex justify-center items-center">
    <input type="file" name="photo" accept="image/*" multiple @change="handleFileChange" class="mx-auto">
    <button type="submit" class="hidden">Envoyer</button>
  </form>
</div>

<div class="relative flex justify-center items-center mt-10">
<button id="btnAddPhoto" method="post" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Ajouter une photo
    </span>
</button>
</div>

<div class="relative flex justify-center items-center mt-10 mb-20">
<button @click="updateRecipe" method="post" class="mt-5  relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Modifier cette recette
    </span>
</button>
</div>


<div v-if="globalError" class="fixed mb-28 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 sm:mt-36 " @click="hideErrorMessage">
      <div class="bg-white p-4 rounded-lg">
        <p class="text-red-600 font-bold text-center">{{ globalErrorMessage }}</p>
      </div>
    </div>


    <div v-if="showSuccessPopup" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" @click="hideSuccessPopup">
      <div class="bg-white text-green-600 p-8 rounded-xl shadow-md">
        <p>Votre recette a été modifier avec succès !</p>
      </div>
    </div>

<!-- **************************************************************************fin card recette*************************************************************************************************** -->




  
  <!-- *****************************************************************Icone de naviguation******************************************************************************************************* -->

  <div id="goToTop" class="fixed z-50 bottom-20 right-5">
  <div class="card w-16 h-16 bg-white border rounded-full shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <img id="goToTop" src="/image/fleche-vers-le-haut-chevron.png" alt="Flèche vers le haut" class="w-full h-full" />
  </div>
</div>
<!-- *****************************************************************Fin icone de naviguation******************************************************************************************************* -->







<!-- ************************************************************************navbar*************************************************************************************************** -->


   <div class="md:hidden"> <!-- Masquer la barre de navigation sur les écrans de taille moyenne et plus grands -->
  <div
    class="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-amber-700 border border-red-950 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div :class="{'grid-cols-4': isUserLoggedIn, 'grid-cols-3 ml-16': !isUserLoggedIn}" class="grid h-full max-w-lg grid-cols-4 gap-2 mx-auto">
      <router-link to="/">
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
      <div id="tooltip-/" role="tooltip"
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


    <!-- ************************************************************************fin navbar********************************************************************************************** -->





    <!-- ***************************************************************************Footer debut **************************************************************************************************-->


    
    <div class="hidden md:block" aria-label="barre de naviguation sur mobile">
<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">Miam Miam™</a>. All Rights Reserved.
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


  <!-- ************************************************************************************Footer fin********************************************************************************* -->






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