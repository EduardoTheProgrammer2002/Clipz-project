import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
  ) {}
  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl('', [
    Validators.required,
    Validators.min(13),
    Validators.max(90)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
     name: this.name,
     email: this.email,
     age: this.age,
     password: this.password,
     confirm_password: this.confirm_password,
     phoneNumber: this.phoneNumber
  }, [RegisterValidators.match('password', 'confirm_password')])

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true

    const { email, password } = this.registerForm.value
    
    try {
      await this.auth.createUser(this.registerForm.value);
    } catch(e: (any | TypeError)) {
      switch(e.code) {
        case 'auth/email-already-in-use':
          this.inSubmission = false
          this.alertMsg = "Email already in use, try another one."
          this.alertColor = "red"
          break;
        default:
          this.inSubmission = false
          this.alertMsg = "An unexpected error occurred. Please try again later"
          this.alertColor = "red"
          break;
      }
      return;
    }

    this.alertMsg = "Success! Your account has been created."
    this.alertColor = 'green'
  }
}
