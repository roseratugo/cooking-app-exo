# Exercice: Application de Recettes de Cuisine

## Objectif

- Apprendre à créer une **API REST** avec `Node.js` et `Express`.
- Apprendre à construire **une interface utilisateur dynamique** avec `Vue 3`.
- **Pratiquer l’intégration** entre le front-end et le back-end.

## Étape 1: Configuration de l’Environnement de Développement

Pour centralisé le frontend en le backend, j'ai créer une monorepositories avec `pnpm`,
pour cela j'ai créer un dossier `apps/` et j'ai ajouter deux dossiers `frontend` et `backend`.
Pour le fonctionnement:<br>
- `pnpm install` pour installer les dépendances (À exécuter à la racine).
- `pnpm -r run dev` pour lancer les serveurs de développement (À exécuter à la racine, la commande lancera le serveur front et back en meme temp).
- `pnpm add le_nom_du_package` pour installer un package (À exécuter dans le dossier ou on a besoin du package (donc soit `/apps/frontend/` ou `/apps/backend`), la commande c'est l'équivalent de `npm install le_nom_du_package`)

/!\ **NE JAMAIS UTILISÉ NPM, UTILISÉ PNPM À LA PLACE** /!\

## Étape 2: Création de l’API REST avec Express

- **Créer la base de donées** avec MySQL.
- **Concevoir le modèle de données** pour une recette, qui peut inclure un titre, une description, des ingrédients, et des étapes de préparation.
- **Créer des routes** pour les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) sur les recettes.

## Étape 3: Développement du Front-End avec Vue 3

- **Construire l'interface utilisateur** pour afficher la liste des recettes. Utiliser des composants Vue pour chaque partie de l'interface (par exemple, liste de recettes, détails de recette, formulaire d’ajout de recette).
- **Implémenter Vue Router** pour naviguer entre les différentes vues de l'application.
- **Consommer l'API REST** créée précédemment pour afficher les recettes existantes, ajouter de nouvelles recettes et afficher les détails d'une recette.

## Étape 4: Intégration et Tests

- **Tester l’API** avec des outils comme Postman pour s'assurer que toutes les routes fonctionnent correctement.
- Si possible, **écrire des tests unitaires et e2e** (pas obligé)


