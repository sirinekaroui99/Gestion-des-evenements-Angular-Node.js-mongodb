import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { CalendarService } from '../services/calendar/calendar.service';
 

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit {


  
  events: any[] = [];
  eventData: any;
  date_debut : any;
  date_fin : any;


constructor(private calendarservice: CalendarService, private router:Router){}

  ngOnInit(): void {
  }

  title = new FormControl('', Validators.required);
  lieu = new FormControl('', Validators.required);
  heure = new FormControl('', Validators.required); 
  description = new FormControl('', Validators.required);



  AddEventForm = new FormGroup({
    title: this.title,
    lieu: this.lieu,
    heure: this.heure, 
    description: this.description,
  });


  onDateChange(event: Event) {
    console.log('rrrrrr',event)
    const dateInput = event.target as HTMLInputElement;
    const dateValue = dateInput.value;
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60).toString().padStart(2, '0');
    const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
    const timezoneOffsetSign = timezoneOffset > 0 ? '-' : '+';
    const timezoneOffsetString = timezoneOffsetSign + timezoneOffsetHours + ':' + timezoneOffsetMinutes;
    const isoDateString = dateValue + 'T00:00:00' + timezoneOffsetString;
    console.log('isodate',isoDateString)
    const inputId = dateInput.id;
    
    if (inputId === 'date_debut') {
      // Le champ de date de début a été modifié
      console.log('Date de début sélectionnée:', isoDateString);
      this.date_debut = isoDateString
    } else if (inputId === 'date_fin') {
      // Le champ de date de fin a été modifié
      console.log('Date de fin sélectionnée:', isoDateString);
      this.date_fin = isoDateString
    }
  }
  

  AddEvent(){ 

    
    const event = {
      summary: this.title.value,
      location: this.lieu.value,
      description: this.description.value,
      start: {
        dateTime: this.date_debut, 
      },
      end: {
        dateTime: this.date_fin, 
      },
    };

  this.calendarservice.addgoogleEvent(event).subscribe(
    (res) => {
      console.log('res',res)
      this.router.navigateByUrl('/home')
    },
    (err) => {
      console.log('err', err)
      this.router.navigateByUrl('/home')
    }
  )
 
  }

}
