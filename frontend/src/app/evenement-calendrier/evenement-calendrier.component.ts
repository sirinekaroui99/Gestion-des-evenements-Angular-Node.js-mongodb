import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import interactionPlugin,{ DateClickArg } from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import { ModalAjoutEventComponent } from '../modal-ajout-event/modal-ajout-event.component';
import frLocale from '@fullcalendar/core/locales/fr';
import { CrudService } from '../services/crud/crud.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { AuthService } from '../services/auth/auth.service';
import { CrudUserService } from '../services/crudUser/crud-user.service';
import jwt_decode from 'jwt-decode';
import { CalendarService } from '../services/calendar/calendar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evenement-calendrier',
  templateUrl: './evenement-calendrier.component.html',
  styleUrls: ['./evenement-calendrier.component.css']
})
export class EvenementCalendrierComponent {

  
  modalRef?: BsModalRef;
  selectedEvent: any;
  title: any;
  date : any;
  temps : any;
  description : any
  lieu : any;
  chef : any;
  user = true;

  success : any = false
  error : any = false
  message : any

  presentDays: number = 0;
  absentDays: number = 0;
  events: any[] = [];


  calendarOptions: CalendarOptions = {
    locale: frLocale,
    initialView: 'dayGridMonth',
    nowIndicator: true,
    plugins: [dayGridPlugin, interactionPlugin],
    events : [],
    eventClick: this.handleEventClick.bind(this), 
    dateClick: this.handleDateClick.bind(this)
    
  };

  config = {
    animated: true
  };

  @ViewChild('template') template!: string;

  start: any; 
  token : any
  data : any
  id : any
  admin : boolean = false
  role : any

  date_debut : any;
  date_fin : any;

 

  constructor(private modalService: BsModalService,private dialog: MatDialog,private eventService: CrudService,
    private authservice : AuthService, private cruduserservice : CrudUserService, 
 ) { }

  ngOnInit(): void {

    this.GoogleUser()
    this.token = this.authservice.isLoggedIn()
    
      
   
    if(this.token != null){
      this.data = jwt_decode(this.token)
      
    this.getUserById(this.data) 
    }
    

    this.getEvents();
   this.InitEvents();
   
  }

  

  getUserById(user : any) : any { 
    this.id = user._id
    console.log('id',user) 
    this.cruduserservice.getUserById(this.id).subscribe(
      (res: any) => {
        this.role = res.role
        console.log('role current user', this.role)
         if(this.role == "admin"){
          this.admin = true
          this.user = false
         }else{
          this.admin = false
          this.user = false
         }
      },
      (error) => {
        console.error(error);
        
      }
    );
 
  }

  GoogleUser(){
    const googleToken = this.authservice.isLoggedInWithGoogle() 
    console.log('ssss',googleToken)
    if(googleToken != null){
      const data = jwt_decode(googleToken)
     console.log('wwwwwwwww', data)
       
    }
  }
 


  handleEventClick(arg:any) {


    

    console.log(arg);
    console.log(arg.event._def.title);
    this.title = arg.event._def.title;
    this.chef = arg.event.extendedProps.chef;
    this.start = arg.event.start;

    let date = new Date(this.start);
    date.setDate(date.getDate() + 1);
    let modifiedDate = this.TransferDate(date);
    let datefin = new Date(modifiedDate)

    this.temps = arg.event.extendedProps.temps;
    this.lieu = arg.event.extendedProps.lieu;
    this.description = arg.event.extendedProps.description;
    //this.modalRef = this.modalService.show(this.template, this.config);
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(ModalEventComponent, {
      data: {
        // Pass data to the dialog if needed
        title: this.title,
        chef : this.chef,
        date : date,
        fin : datefin,
        temps : this.temps,
        lieu : this.lieu,
        description: this.description
      },
    });
  }

  handleDateClick(arg : any){
    if(this.admin){
      console.log(arg.date)

      let Date = this.TransferDate(arg.date) 
      const dialogRef = this.dialog.open(ModalAjoutEventComponent, {
        data: {
          // Pass data to the dialog if needed
          info : "add",
          date : Date
        },
      });
  
      dialogRef.afterClosed().subscribe((result) => { 
        if (result == true) {
          console.log('User confirmed');
          this.getEvents()
          this.success = true
  
          setTimeout(() => {
            this.success = false; 
          }, 2500);
          this.message = "Événement ajouté avec succès"
           // Logique pour supprimer l'événement
      
        } else  {
          this.error = true
          this.message = "Evenement n'est pas ajouté"
          setTimeout(() => {
            this.error = false;
          }, 3000);
          console.log('User did not confirm');
        }
      });
  
    }
    

   }

  InitEvents(){
    console.log('ffffffffff',this.events)
    this.events.forEach((e: { [x: string]: string; }) => {
      if (e["title"] == 'Present') {
        this.presentDays++;
      } else {
        this.absentDays++
      }
    });
    console.log("Present " + this.presentDays);
    console.log("Absent " +this.absentDays);
  }

  getCurrentMonthDays(){
    // Get current month and year
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get number of days in current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create an array to hold all days
    const days = [];

    // Loop over each day of the month and add to array
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    // Log the array of days
    console.log(days);

  }

  TransferDate(fullDate : any) : any{
    
    const day = fullDate.getDate().toString().padStart(2, '0');;
const month = (fullDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
const year = fullDate.getFullYear();

let Date = day + '/' + month + '/' + year;
console.log('date', Date);
return Date;
  }

  getEvents(): void {
    console.log('get events')
    this.eventService.getEvents().subscribe(
      data => {
        let result : any = data
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].date);
          //result[i].date = this.TransferDate(result[i].date)
          result[i].backgroundColor = 'blue'; // Ajouter une couleur de fond bleue à chaque événement
        }
        this.events = result;
        if (this.calendarOptions) {
          this.calendarOptions.events = this.events;
        }
      },
      error => {
        console.error(error);
        return false
      }
    );
  }


  

  editEvent(event: any) {
    let id = event._id


    const dialogRef = this.dialog.open(ModalAjoutEventComponent, {
      data: {
        // Pass data to the dialog if needed
        info : "update",
        calendarOptions : this.calendarOptions,
        id : id,
        event : event
      },
    });

    dialogRef.afterClosed().subscribe((result) => { 
      if (result == true) {
        console.log('User confirmed');
        this.getEvents()
        this.success = true

        setTimeout(() => {
          this.success = false; 
        }, 2500);
        this.message = "Événement modifié avec succès"
         // Logique pour supprimer l'événement
    
      } else {
        this.error = true
        this.message = "Modifications non pris on charge"
        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.log('User did not confirm');
      }
    });

    
  }

  deleteEvent(event: any) {
    let id =  event._id
    console.log('delete', event._id)

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        // Pass data to the dialog if needed
        info: "delete",
      },
    }); 
    dialogRef.afterClosed().subscribe((result) => { 
      if (result == true) {
        console.log('User confirmed');
         // Logique pour supprimer l'événement
    this.eventService.deleteEvent(id).subscribe(
      () => { 
        console.log('Événement supprimé avec succès');
        this.success = true
        setTimeout(() => {
          this.success = false;
        }, 3000);
        this.message = "Événement supprimé avec succès"
        this.getEvents()
      },
      (error) => {
        this.error = true
        this.message = "Erreur de suppression de l'événement"
        setTimeout(() => {
          this.error = false;
        }, 2500);
        console.error(error);
      }
    );
      } else {
        console.log('User did not confirm');
      }
    });
  }
 


 


}
