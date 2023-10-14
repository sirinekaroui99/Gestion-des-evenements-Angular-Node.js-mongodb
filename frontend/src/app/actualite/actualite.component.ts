import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit{

  token : any;
  admin :  any

  constructor(private authservice : AuthService){}

  ngOnInit(): void {
    this.admin = this.authservice.verifAdmin()
  }

  actualite: any = [
    { title: 'Present',chef : 'chef', date: '2023-04-01', temps: '12PM', lieu : 'lieu1',
     description : 'description111jjjjjjjjjjj jjjjjjjjjj jjjjjjjjjjjjj llllllllllllll jjjjjjjjjjjjjjjjjjjjjjjjjji iiiiiiiiiiiiiii jjjjjjjjjjjjjjjjjj hhhhhhhhhhhhhhhhhhh'
    , color: '#0000FF', soustitre : 'soustitre',image : "../../assets/image/Parc.jpg" },
    { title: 'Absent', chef : 'chef',date: '2023-04-02',  temps: '10AM',lieu : 'lieu2',description : 'description222',color: '#0000FF' , soustitre : 'soustitre', image : "../../assets/image/Odoo.png"},
    { title: 'Present',chef : 'chef', date: '2023-04-03',temps: '10AM',lieu : 'lieu3',description : 'description3333', color: '#FF0000', soustitre : 'soustitre' },
  ];

  


  


}
