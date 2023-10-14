import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http : HttpClient) { }
 
 
  getgoogleEvents( ){
    return this.http.get(`http://localhost:3000/crudgoogle/getgoogleEvents`)
  }

  addgoogleEvent(event : any){
    return this.http.post(`http://localhost:3000/crudgoogle/addgoogleEvent`,event)
  }

  deletegoogleEvent(id : any){ 
    return this.http.delete(`http://localhost:3000/crudgoogle/deletegoogleEvent/${id}`)
  }

}
