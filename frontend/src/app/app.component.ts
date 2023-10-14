import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import jwt_decode from 'jwt-decode'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  home = true;
  actualites = true;
  currentURL : any;
  profile: any = false;
  connect: any = true;
  userGoogle = false
  constructor(private router : Router, private authservice : AuthService) { 
    this.currentURL = window.location.href; 
}
  ngOnInit(): void {
    this.GoogleUser()
    console.log('userGoogle',this.userGoogle)
   if(!this.authservice.isLoggedIn()) {
    this.connect = false;
   }
    
    if (this.currentURL != "http://localhost:4200/") {
      this.home = false;      
  } 
  if (this.currentURL != "http://localhost:4200/actualites") {
      this.actualites = false;      
  } 
  if (this.currentURL == "http://localhost:4200/admin" || this.currentURL == "http://localhost:4200/membre") {
      this.profile = true;      
  } 
  console.log('home', this.home, 'actualites', this.actualites,'profile', this.profile, 'connect', this.connect)
  }

  GoogleUser(){
    const googleToken = this.authservice.isLoggedInWithGoogle() 
    console.log('ssss',googleToken)
    if(googleToken != null){
      const data = jwt_decode(googleToken)
     console.log('wwwwwwwww', data)
     this.userGoogle = true
       
    }else{
      this.userGoogle = false
    }
  }


  onLogoutClick(){
   this.authservice.logout();
   window.location.href = 'http://localhost:4200';
  }

  onProfileClick(){
    if(this.userGoogle){
      console.log('hj')
      window.location.href = 'http://localhost:4200/membre';
    }else
    if(this.authservice.verifAdmin() == true){
      window.location.href = 'http://localhost:4200/admin';
    } 
  }

}
