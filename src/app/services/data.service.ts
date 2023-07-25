import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {User} from '../shared/domain/user.model';
import {AES, enc} from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  private db: any
  private TOKEN_SECRET = "DFGHJKFDFGHJKGFGHJKHFDFGHJKGTYJF"

  createDb() {
    this.db = {
      users: [
        {
          id: 1,
          lastName: 'Poncet',
          firstName: 'Alexandre',
          email: 'poncet@gmail.com',
          birth_at: new Date(),
          password: 'password',
          idRole: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          lastName: 'Regnault',
          firstName: 'Basile',
          email: 'basile.regnault@gmail.com',
          birth_at: new Date(),
          password: 'password',
          idRole: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      workouts: [
        {
          id: 1,
          capaciteMax: 40,
          dateDebut: new Date(),
          dateFin: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          idTheme: 1,
          idWorkoutType: new Date(),
        }
      ],
      themes: [
        {
          id: 1,
          libelle: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      establishments: [
        {
          id: 1,
          nom: 'Basile Fit',
          address: 'Rue des abricots',
          city: 'Lyon',
          cp: 69200,
          openHours: new Date(),
          closeHours: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      reservations: [
        {
          id: 1,
          isConfirmed: true,
          isCanceled: false,
          isUpdated: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          idUsers: 1,
          idWorkout: 1,
        }
      ],
      notifys: [
        {
          id: 1,
          message: "Votre séance du 20 est morte",
          idReservation: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      roles: [
        {
          id: 1,
          libelle: "ROLE_ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      workoutTypes: [
        {
          id: 1,
          libelle: "Badminton",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      coachs: [
        {
          id: 1,
          degree: "Master 1 en télécom",
          createdAt: new Date(),
          updatedAt: new Date(),
          idEtablishments: 1,
          idUsers: 1,
        }
      ],
      wourkoutsEstablishments: [
        {
          id: 1,
          idWorkout: 1,
          idEtablishments: 2,
        }
      ],
      authentification: []
    };
    return this.db;
  }

  post(requestInfo: RequestInfo) {
    if (requestInfo.collectionName === 'authentification') {
      if (requestInfo.id === 'login') {
        return this.handleLoginRequest(requestInfo);
      }
      if (requestInfo.id === 'register') {
        return this.handleRegisterRequest(requestInfo);
      }
      if (requestInfo.id === 'checkAuth') {
        return this.checkAuth(requestInfo);
      }
    }

    // Laisser l'API gérer la requête pour les autres collections
    return undefined;
  }

  private handleLoginRequest(requestInfo: any) {
    const userLogin: Partial<User> = requestInfo.req.body;
    const user: User = this.db.users.find((u: User) => u.email === userLogin.email && u.password === userLogin.password)

    // Vérifier que l'utilisateur existe et renvoie une erreur 401 sinon
    if (!user) {
      return requestInfo.utils.createResponse$(() => ({
        body: {error: 'Adresse email ou mot de passe incorrecte'},
        status: 401,
        statusText: 'Unauthorized'
      }));
    }

    const secretKey = this.TOKEN_SECRET;
    const userData = {
      userId: user.id,
      expiresAt: Math.floor(Date.now() / 1000) + 3600
    };

    //Création du token d'authentification
    const token = AES.encrypt(JSON.stringify(userData), secretKey).toString();

    return requestInfo.utils.createResponse$(() => ({
      body: {token: token},
      status: 200,
      statusText: 'OK'
    }));

  }

  private handleRegisterRequest(requestInfo: any) {
    const users = this.db.users; // Accéder à la liste des utilisateurs
    const newUser = requestInfo.req.body;
    const newUserId = users.length + 1;

    if (!newUser.lastName || !newUser.firstName || !newUser.email || !newUser.birth_at || !newUser.password || !newUser.idRole) {
      return requestInfo.utils.createResponse$(() => ({
        body: {error: "Tout les champs doivent être remplis"},
        status: 401,
        statusText: 'Unauthorized'
      }));
    }

    const isEmailTaken = users.some((user: any) => user.email === newUser.email);
    const isPasswordValid = this.isValidPassword(newUser.password);

    if (isEmailTaken || !isPasswordValid) {
      const errorMessage = isEmailTaken ? 'Email existe' : 'Mauvais mots de passe';
      return requestInfo.utils.createResponse$(() => ({
        body: {error: errorMessage},
        status: 401,
        statusText: 'Unauthorized'
      }));
    }
    const user = {
      id: newUserId,
      ...newUser,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const response = {
      id: newUserId,
      message: 'Inscription réussie'
    };
    users.push(user);

    return requestInfo.utils.createResponse$(() => ({
      body: response,
      status: 200,
      statusText: 'OK'
    }));
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  private checkAuth(requestInfo: any) {
    const token = requestInfo.req.body;
    const secretKey = this.TOKEN_SECRET;

    try {
      const decryptedToken = AES.decrypt(token, secretKey).toString(enc.Utf8);
      const userData = JSON.parse(decryptedToken);
      // Stock true si le token est expirée
      const isTokenExpired = userData.expiresAt < Math.floor(Date.now() / 1000);
      // vérifier si le token est expiré
      if (isTokenExpired) {
        return requestInfo.utils.createResponse$(() => ({
          body: false,
          status: 401,
          statusText: 'Unauthorized'
        }));
      }

      return requestInfo.utils.createResponse$(() => ({
        body: true,
        status: 200,
        statusText: 'OK'
      }));

    } catch (error) {
      return requestInfo.utils.createResponse$(() => ({
        body: false,
        status: 401,
        statusText: 'Unauthorized'
      }));
    }
  }
}


