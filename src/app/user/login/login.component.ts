import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMsg = "Wait a minute, we're loging you in.";
  alertColor = "blue";
  inSubmission = false;

  constructor(
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  setErrorMessage(codeError:string):void {
    switch(codeError) {
      case 'auth/user-not-found':
        this.alertMsg = "The email address does not exist, please try another one."
        break;
      case 'auth/wrong-password':
        this.alertMsg = "The password is incorrect, please try again."
        break;
      default: 
        this.alertMsg = "An unexpected error ocurred, please try again later."
        break;
    }
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = "Wait a minute, we're loging you in.";
    this.alertColor = "blue";
    
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      );

    } catch (error: (any | TypeError)) {
      this.showAlert = true;
      this.alertColor = "red";
      this.setErrorMessage(error.code);

      this.inSubmission = false
      return
    }

    this.alertMsg = "Success! You are logged in.";
    this.alertColor = "green";
  }

}
