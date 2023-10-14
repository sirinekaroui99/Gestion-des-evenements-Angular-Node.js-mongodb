import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud/crud.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
 
@Component({
  selector: 'app-modal-ajout-event',
  templateUrl: './modal-ajout-event.component.html',
  styleUrls: ['./modal-ajout-event.component.css']
})
export class ModalAjoutEventComponent implements OnInit{
   
  events: any[] = [];
  eventData: any;


  constructor(
    private dialogRef: MatDialogRef<ModalAjoutEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private eventService: CrudService,private dialog: MatDialog,private router: Router,private location: Location,
   
  ) {
     
  }
  ngOnInit(): void {
    if(this.data.info == "update"){
      this.getEventById();
    }
  }

  title = new FormControl('', Validators.required);
  chef = new FormControl('', Validators.required);
  lieu = new FormControl('', Validators.required);
  heure = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);



  AddEventForm = new FormGroup({
    title: this.title,
    chef: this.chef, 
    lieu: this.lieu,
    heure: this.heure,
    description: this.description,
  });


  onClose(info : any) {  
    //console.log('fenetre closed')
    if( info == "add" ){
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
          data: {
            // Pass data to the dialog if needed
            info : "quitadd",
          },
        })
        this.afterclosed(dialogRef)
    }else if(info =="update"){
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        data: {
          // Pass data to the dialog if needed
          info : "quitupdate",
        },
      })
      this.afterclosed(dialogRef)
    }
    
   
    
    
  }

  afterclosed(dialog : any){
    dialog.afterClosed().subscribe((result : any) => { 
      if (result == true) {
        console.log('User confirmed');
         // Logique pour supprimer l'événement
    this.dialogRef.close(); 
      } else {
        console.log('User did not confirm');
      }
    });
  }
  
  
  AddEvent(){ 
    let event = {
      title : this.title.value,
      chef : this.chef.value,
      lieu: this.lieu.value,
      heure: this.heure.value,
      description: this.description.value,
      date : this.data.date
    } 

    this.eventService.AddEvent(event).subscribe(
      () => {  
        this.dialogRef.close(true);
        
        
  // délai de 3 secondes avant la fermeture du modal
        console.log('Événement enregistré avec succès');
      },
      (error) => { 
        console.error(error);
      }
    );
  }

  getEventById(){
    let id = this.data.id
    this.eventService.getEventById(id).subscribe(
      (event: any) => {
        this.eventData = event;
        this.title.setValue(event.title);
        this.chef.setValue(event.chef);
        this.lieu.setValue(event.lieu);
        this.heure.setValue(event.heure);
        this.description.setValue(event.description);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEvents(): void {
    console.log('get event by id')
    this.eventService.getEvents().subscribe(
      data => {
        let result : any = data
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].date);
          //result[i].date = this.TransferDate(result[i].date)
          result[i].backgroundColor = 'blue'; // Ajouter une couleur de fond bleue à chaque événement
        }
        this.events = result;
        if (this.data.calendarOptions) {
          this.data.calendarOptions.events = this.events;
        }
      },
      error => {
        console.error(error);
        return false
      }
    );
  }

  UpdateEvent(){
    console.log('update')
    // Logique pour modifier l'événement
    let id = this.data.id
    let event = {
      title : this.title.value,
      chef : this.chef.value,
      lieu: this.lieu.value,
      heure: this.heure.value,
      description: this.description.value,
      date : this.data.date
    } 
    this.eventService.updateEvent(id, event).subscribe(
      () => {
        console.log('Événement mis à jour avec succès');
         
          this.dialogRef.close(true);
          
   
        this.getEvents(); // rechargement de la liste des événements après la mise à jour
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}
