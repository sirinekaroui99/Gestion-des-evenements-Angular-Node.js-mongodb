import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token : any;
  data : any;
  constructor(private http : HttpClient) { }

  sendMail(contact : any){
    return this.http.post(`http://localhost:3000/mail/sendmail`,contact)
  }

  register(data : any){
    console.log('dataaaaaaaaa',data)
    return this.http.post(`http://localhost:3000/authapi/register`,data)
  }

  setToken(token:string){
    console.log('token',token)
      localStorage.setItem('token' , token);
  }

  setGoogleToken(token:string){
    console.log('token',token)
      localStorage.setItem('access_token' , token);
  }

  login(data : any){
    return this.http.post(`http://localhost:3000/authapi/login`,data)
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    //return this.http.get(`http://localhost:5000/logout`)
  }

  isLoggedIn(){
    this.token =  localStorage.getItem('currentUser');
    console.log("token",this.token)
    return this.token
  }

  isLoggedInWithGoogle(){
    this.token =  localStorage.getItem('access_token');
    console.log("token",this.token)
    return this.token
  }

  verifAdmin() : boolean{
    this.token =  localStorage.getItem('currentUser');
    this.data = jwt_decode(this.token)
      console.log('res',this.data.role)
      if( this.data.role == "admin"){
        return true;
      }else{
        return false;
      }
  }

  getCookie(name: string): string {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0) return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
    return 'null';
  }

  

}
