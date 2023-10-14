import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  constructor(private http : HttpClient) { }
 
 
  login(){
    return this.http.get(`http://localhost:3000/auth`)
  }
 

  logged(data : any){
    return this.http.post(`http://localhost:3000/auth/login`,data)
  }

  callback(){
    
    return this.http.get(`http://localhost:3000/auth/callback`);
  }

  

}
