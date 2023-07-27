# Sport-resa

## 1. Lancement du projet

Installation des dépendances :

```
npm install
```

Lancement du serveur :

```
ng serve
```

## 2. Outils mis en place

**Prettier :** Pour le formatage du code

**EsLint :** Analyse du code pour identifier les erreurs

**Husky :** Script de pré-commit pour lancer le linter avant chaque commit

**Compodoc :** Pour la documentation du projet

**Angular devTools :** Pour l'inspection dans le navigateur

## 3. Modèle de donnée

![image-20230727175347481](https://cdn.discordapp.com/attachments/895275132174626828/1134219038587896008/image.png)

## 4. Découpage des modules

Nous avons décidé de découper nos modules de cette façon :

- **auth** : Authentification avec les guards, le login et le register
- **admin** : Gestion des vues administrateurs
- **notify** : Gestion des notification *(TODO)*
- **reservation** : Gestion des réservations pour l'utilisateur
- **user** : Gestion des rôles, des utilisateurs et des coachs *(TODO)*
- **workout** : Gestion des séances de sport, des type de séance de sport, de la réservation des séances et des thèmes *(TODO)*
- **establishment** : Gestion des établissements

Notre choix de base et qui nous semblait le plus logique était de faire :

- **auth** : Module d'authentification
- **client** : Gestion des vues de l'utilisateurs
- **admin** : Gestion des vues administrateurs

Cependant nous n'avons pas retenus ce choix, car nous voulions tester l'architecture et en voir les limites dans notre projet. Egalement car cela nous permet de faire du lazy module, sinon tout nos modules aurait été actif. Cela nous permet également de mieux découper notre code et d'avoir des modules léger et facilement compréhensible.

Nous avons également un module partagé nommé **shared** qui permet de partager à l'ensemble de nos modules nos models de données ts.

## 5. Listes des routes

- /users : Accès à la liste des utilisateurs
- /auth : Authentification
- /auth/login : Formulaire de connexion
- /auth/register : Formulaire d'inscription
- /workouts : Liste des séances de sports
- /establishments : Liste des établissements
- /reservations : Liste des réservations de l'utilisateur

## 6. Hiérarchie des composants

Nous avons utilisé le pattern Smart/Dumb pour nos composants. Les dumb components affiche les données qui sont récupérées dans le smart component via le display-service dans le dossier applications. Nos composants sont eux dans le dossier vue.

Dans le cas des CRUD nos composants sont fait de la façon suivante :

- **Smart :**
  - model-form-smart: Composant qui implémente les méthodes pour communiquer avec le service display lors des opérations d'un formulaire
  - model-list-smart: Composant  qui implémente les méthodes pour communiquer avec le service display pour afficher la listes des données du model avec les opération qui vont avec.
- **Dumb :**
  - model-form-dumb: Composant qui récupère les données du smart composant, affiche le formulaire à l'utilisateur et emet un event au composant smart en fonction de l'opération de l'utilisateur
  - model-list-dumb: Composant qui récupère les données du smart composant, affiche la liste des données du model à l'utilisateur et emet un event au composant smart en fonction de l'opération de l'utilisateur sur la liste

## 7. Fonctionnalités implémentés

- Authentification :
  - Login
  - Register
- Admin :
  - CRUD de gestion des établissements pour l'administrateur
  - CRUD de gestion des séances de sports
- Utilisateur :
  - Liste des séances de sport disponible
  - Liste des réservations de l'utilisateur
  - Réservation d'une séance de sport
  - Liste des utilisateurs
- Interface
  - Formulaire de connexion / Register
  - NavBar

## 8. Mesures des performances

## 9. Problèmes rencontrés

​	Nous n'avons pas pu finir le projet ni même faire la moitié de ce que nous voulions par manque de temps et surtout de difficulté à mettre en place le projet avec les consignes initiales. Nous avons tout de même essayé de respecter au mieux les consignes et l'architecture. Les consignes données à la fin nous ont quand même aidé à mieux comprendre le sujet et ce qu'il fallait mettre en place.
