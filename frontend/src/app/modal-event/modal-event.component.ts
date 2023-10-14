import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth/auth.service';
import jwt_decode from 'jwt-decode'; 
import { CalendarService } from '../services/calendar/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css']
})
export class ModalEventComponent implements OnInit {

  userGoogle = false
  event = {
    summary: '',
    location: '',
    description: '',
    start: {
      dateTime: '', 
    },
    end: {
      dateTime: '', 
    },
  };
  
  constructor(private authservice : AuthService, private calendarservice : CalendarService,private router:Router,
    private dialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void { 
    this.event.summary = this.data.title;
    this.event.start.dateTime = this.data.date
    this.event.description = this.data.description
    this.event.location = this.data.lieu
    this.event.end.dateTime = '2023-05-25T00:00:00.000Z'
  }

  onClose() { 
    this.dialogRef.close(); 
  }

  GoogleUser(){
    const googleToken = this.authservice.isLoggedInWithGoogle() 
    console.log('ssss',googleToken)
    if(googleToken != null){
      const data = jwt_decode(googleToken)
     console.log('wwwwwwwww', data)
     this.userGoogle = true
       
    }else{
      this.userGoogle = false
    }
  }

  AddEvent(){  
    console.log('event',this.event)

  this.calendarservice.addgoogleEvent(this.event).subscribe(
    (res) => {
      console.log('res',res)
      //this.router.navigate(['/membre'])
      //window.close()
    },
    (err) => {
      console.log('err', err)
      //window.close()
      //this.router.navigate(['/membre'])

    }
  )
 
  }

}
