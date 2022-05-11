import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, map, Observable, filter } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = this.auth.user.pipe(
      map(user => !!user)
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(console.log)
   }

  public async createUser(userData:IUser) {
    if(!userData.password) {
      throw new Error('Password no provided.');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    )

    if(!userCred.user) {
      throw new Error('User not found.');
    }

    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    });
    
    await userCred.user.updateProfile({
      displayName: userData.name
    });
  }

  public async logout($Event?: Event) {
    if ($Event) {
      $Event.preventDefault();
    }

    await this.auth.signOut();
    
    await this.router.navigateByUrl("/");
  }
}
