import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../services/crud/crud.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent implements OnInit{

   
  events: any[] = [];
  eventData: any;
  delete :any = false;
  quitupdate : any = false;
  quitadd : any = false;

  constructor(
    private dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private eventService: CrudService,private router: Router,private location: Location
  ) {
     
  }
  ngOnInit(): void {
    if (this.data.info =="delete" )
    {
      this.delete = true;
    }
    if(this.data.info == "quitupdate")
    {
      this.quitupdate = true;
    }
    if( this.data.info == "quitadd")
    {
      this.quitadd = true;
    }
    
  }
  
  onYes() { 
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }

  
 
}
