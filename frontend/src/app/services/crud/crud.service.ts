import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  constructor(private http : HttpClient) { }


  
  AddEvent(event : any){
    console.log('eventdataservice', event)
    return this.http.post(`http://localhost:3000/crud/addEvent`, event)
}

getEvents(){
    return this.http.get(`http://localhost:3000/crud/getEvents`)
  }

  getEventsByMonth(month : any){
    return this.http.get(`http://localhost:3000/crud/getEventsByMonth/${month}`)
  }

  getEventById(id : any){
    return this.http.get(`http://localhost:3000/crud/getEventById/${id}`)
  }

  updateEvent(id: string, event: any){
    return this.http.put(`http://localhost:3000/crud/updateEvent/${id}`,event)
  }

  deleteEvent(id : any){
    return this.http.get(`http://localhost:3000/crud/deleteEvent/${id}`)
  }


}
