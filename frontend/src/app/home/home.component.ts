import { Component , OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode'; 
import { Router } from '@angular/router'; 
declare const L : any ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  passwordInput : any
  showed = false;
  password_incorrect : boolean = false;
  adresse_incorrect : boolean = false;
  admin : boolean = false;
  membre : boolean = false
  data : any;
  connect : boolean = false; 
  userGoogle = false;

  success : any = false;
  error : any = false; 
  message : any 

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',  [Validators.required, Validators.minLength(6)]);

  mail = new FormControl('', [Validators.required, Validators.email]);
  msg = new FormControl('',  [Validators.required]);


  constructor(private authservice : AuthService ,private router: Router){}

  signin = new FormGroup({ 
    email: this.email,
    password: this.password,  
    
  }); 

  contact = new FormGroup({ 
    mail: this.mail,
    msg: this.msg,  
    
  }); 
  contacter(){
    let contact = {
      mail : this.mail.value,
      msg : this.msg.value
    }

    this.authservice.sendMail(contact).subscribe(
      (res) => {
        console.log('ress submit mail', res)
      },
      (err) => {
        console.log('err mail submit', err)
      }
    )

  }
  show(){
    console.log('ddddddddddddddddd')
this.showed = true;
var passwordInput = document.getElementById("password")as HTMLInputElement;;
  if (passwordInput!.type === "password") {
    passwordInput!.type = "text";
  } else {
    passwordInput.type = "password";
  }
  }

  dontshow(){
    this.showed = false;
    var passwordInput = document.getElementById("password")as HTMLInputElement;;
  if (passwordInput!.type === "password") {
    passwordInput!.type = "text";
  } else {
    passwordInput.type = "password";
  }
  }

  ngOnInit(): void { 
    this.GoogleUser() 
    this.connect = this.authservice.isLoggedIn()
    this.admin = this.authservice.verifAdmin()
    if(!navigator.geolocation){
      console.log('location is not suported')
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords
      //const LatLong = [coords.latitude,coords.longitude]
      const LatLong = [37.0553969,10.1040948]
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    let map = L.map('map').setView(LatLong, 13); 

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let marker = L.marker(LatLong).addTo(map);

    marker.bindPopup('<b>Kalaat al andalous</b>').openPopup();

    });
    this.watchPosition();
  }

  onLogoutClick(){
    this.authservice.logout();
   }
 
   onProfileClick(){ 
       window.location.href = 'http://localhost:4200/membre';
  
   }

  watchPosition(){
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition((position) => {
      console.log(
        `lat : ${position.coords.latitude}, lon : ${position.coords.longitude}`
      );
      if(position.coords.latitude === desLat) {
        navigator.geolocation.clearWatch(id);
      }
    },(err) => {
      console.log(err)
    }, {
      enableHighAccuracy : false,
      timeout : 1000,
      maximumAge : 0
    }
    )
  }


  login(){
    this.password_incorrect = false;
    this.adresse_incorrect = false;
    let user = {
      email : this.email.value,
      password : this.password.value
    }
    console.log('userlogin',user)
    this.authservice.login(user).subscribe(
    (res) => {
      //console.log('login', res, 'L’adresse e-mail que vous avez saisi(e) n’est pas associé(e) à un compte.','Le mot de passe entré est incorrect.')
      let result : any = res
      //console.log('res', result.message)
      if (result.message == "No user found")
      {
        this.adresse_incorrect = true;
        console.log("L’adresse e-mail que vous avez saisi(e) n’est pas associée à un compte.")
      }else
      if (result.message == "Password does not matched"){
        console.log('Le mot de passe entré est incorrect.')
        this.password_incorrect = true;
      } else{
        this.success = true;
      this.message =  "Connecté"
      this.signin.reset();

      
      localStorage.setItem('currentUser', JSON.stringify(result.token));
      this.data = jwt_decode(result.token)
      console.log('res',this.data.role)
      if( this.data.role == "admin"){

        this.admin = true;
        setTimeout(() => {
          this.success = false;
          this.router.navigate(['/admin']);
        }, 3000);
      }else if (this.data.role == "membre"){
        this.membre = true
        setTimeout(() => {
          this.success = false;
          this.router.navigate(['/membre']);
        }, 3000);
      }
      }
      
        
    },
    (error) => {
      this.message =  "Erreur de connexion"
      console.log('error login',error)
    }
  ) 
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


}
