import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CalendarService } from '../services/calendar/calendar.service';
import { AuthService } from '../services/authGoogle/auth.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  // rest of your code
  events: any[] = [];
  ajout : any = true;
  constructor(private router : Router, private dataService: DataService,private dialog: MatDialog,private calendarservice: CalendarService,private authservice : AuthService){}
  
  ngOnInit(): void { 
    this.getEvents()
  }

  sendData() {
    this.dataService.setData(this.ajout); 
  }

  delete(id : any){
    console.log('ssssssss',id)

     const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        // Pass data to the dialog if needed
        info: "delete",
      },
    }); 
    dialogRef.afterClosed().subscribe((result : any) => { 
      if (result == true) {
        console.log('User confirmed');
         // Logique pour supprimer l'événement
         this.calendarservice.deletegoogleEvent(id).subscribe( 
          (res) => {
            console.log('res delete ', res)
            this.getEvents()
          },
          (error) => {
            console.log('error delete ', error)
            this.getEvents()
          }
         )
     
      } else {
        console.log('User did not confirm');
      }
    });



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

