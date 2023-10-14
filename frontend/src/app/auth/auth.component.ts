import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthService } from 'src/app/services/authGoogle/auth.service';
import { CalendarService } from 'src/app/services/calendar/calendar.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    user: firebase.User | null = null;
    data : any;
    token : any
    nouvelleFenetre : any
    events : any
    constructor(private auth: AngularFireAuth,private http: HttpClient,private authservice : AuthService, private calendarservice : CalendarService,private router: Router) {
      this.auth.user.subscribe(user => {
        this.user = user;
      });
    }
    ngOnInit(): void {  
      window.location.href = 'http://localhost:3000/auth';
       
      //this.router.navigateByUrl('/home');
    }
  
  
  
    loginWithEmail(email: string, password: string) {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          console.log(userCredential.user);
        })
        .catch(error => {
          console.error(error);
        });
    }
     
   
    
    loginWithGoogle() {
      const auth = firebase.auth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
    .then((result) => { 
  
      
  
      // The signed-in user info.
      const user = result.user;
      console.log('cccccccc',user)
     
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log('tokeen', this.token)
      console.log("accessToken",accessToken);
      //this.data.access_token = accessToken; 
      
      
      if (user) {
        user.getIdToken().then(token => {
          //this.data.id_token = token;
          this.token = token
          this.data = {
            "id_token" : this.token,
            "accessToken" : accessToken
      
          }
          console.log('dataaaaaaaaaaaaaaaa',this.data)
          //this.logged(this.data);
         
          //this.getEvents()
        });
      }
    })
    .catch((error) => {
      // Handle errors here.
      console.error(error);
    });
    }
  
    logout() {
      this.auth.signOut();
    }
  
  
    
  
    logged(data : any){
     console.log("dataaa",data)
      this.authservice.logged(data).subscribe(
        (res) => {
          console.log('result_login', res)
        },
        (err) => {
          console.log('error_login',err)
        }
      )
    }
  
    getEvents(){
      this.calendarservice.getgoogleEvents().subscribe(
        (res : any) => {
          // Traitement des données renvoyées par le service
          console.log('Résultat de la requête :', res);
          this.events = res;
          // ...
        },
        (error) => {
          // Gestion des erreurs éventuelles
          console.error('Erreur lors de la requête :', error);
          // ...
        }
      );
      
    }
  
  
  }
  