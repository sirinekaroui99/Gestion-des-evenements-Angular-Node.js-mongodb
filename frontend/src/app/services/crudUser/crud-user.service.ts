import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  constructor(private http : HttpClient) { }

  
  AddUser(user : any){
    return this.http.post(`http://localhost:3000/crudUser/addUser`, user)
}

getUsers(){
    return this.http.get(`http://localhost:3000/crudUser/getUsers`)
  }

  getUsersByMonth(month : any){
    return this.http.get(`http://localhost:3000/crudUser/getUsersByMonth/${month}`)
  }

  getUserById(id : any){
    return this.http.get(`http://localhost:3000/crudUser/getUserById/${id}`)
  }

  updateUser(id: string, user: any){
    return this.http.put(`http://localhost:3000/crudUser/updateUser/${id}`,user)
  }

  deleteUser(id : any){
    return this.http.get(`http://localhost:3000/crudUser/deleteUser/${id}`)
  }

}
