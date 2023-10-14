import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',  [Validators.required, Validators.minLength(6)]);
  confpassword = new FormControl('', [Validators.required, this.passwordMatchValidator]);
  role = new FormControl('', Validators.required);

  passwordMatchValidator(control: FormControl) {
    const password = control.root.get('password');
    return password && control.value !== password.value ? { passwordMismatch: true } : null;
  }

  constructor(private authservice : AuthService, private router : Router){} 
 
  signup = new FormGroup({ 
    username : this.username, 
    email: this.email,
    password: this.password,
    confpassword: this.confpassword, 
    role: this.role, 
    
  }); 


  Register(){

    let user : User = {
      username : this.username.value!,
      email : this.email.value!,
      password : this.password.value!,
      role : this.role.value!
    } 
    
    this.authservice.register(user).subscribe(
      (res) => {
        console.log('register', res)
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('error register',error)
      }
    )  
  }



}
