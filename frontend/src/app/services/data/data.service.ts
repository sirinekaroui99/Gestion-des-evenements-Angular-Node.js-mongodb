import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http : HttpClient) { }

  private myData: any;

  setData(data: any) {
    this.myData = data;
    console.log('ddd',this.myData)
  }

  getData() {
    return this.myData;
  }


}