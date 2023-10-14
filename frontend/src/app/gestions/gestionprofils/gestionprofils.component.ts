import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalAjoutEventComponent } from 'src/app/modal-ajout-event/modal-ajout-event.component';
import { ModalConfirmComponent } from 'src/app/modal-confirm/modal-confirm.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudUserService } from 'src/app/services/crudUser/crud-user.service';



@Component({
  selector: 'app-gestionprofils',
  templateUrl: './gestionprofils.component.html',
  styleUrls: ['./gestionprofils.component.css']
})
export class GestionprofilsComponent implements OnInit{

  roleoption : any
  data : any
  update  : boolean = false;
  add : boolean = true;
  id : any
  token : any;
  user : any
  userValue : any


  username = new FormControl('');
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',  [Validators.required, Validators.minLength(6)]);
  role = new FormControl('', Validators.required);


  addUserForm = new FormGroup({
    username : this.username,
    email: this.email,
    password: this.password,
    role: this.role,
    
  }); 


  users : any

  constructor(private cruduserservice : CrudUserService,private dialog: MatDialog, private authservice : AuthService){}
  ngOnInit(): void { 
    this.getUsers()
   
  }

  getUsers(){
    this.cruduserservice.getUsers().subscribe(
      (res) =>{
        this.users = res;
        console.log('users list' , res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  onRoleChange(event : any) : any{
    this.roleoption = event.target.value;
    console.log(this.role);
    return this.roleoption
  }



  addUser(){

    let user : User = {
      username : this.username.value!,
      email : this.email.value!,
      password : this.password.value!,
      role : this.roleoption
    } 

    console.log('cccc',this.roleoption)

    this.cruduserservice.AddUser(user).subscribe(
      (res) => { 
        this.addUserForm.reset();
        this.getUsers()
      },
      (err)=> {
        console.log(err)
      }
    )
  }

  deleteUser(event: any, user : any) {
    let id =  user._id
    console.log('delete', user._id)

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
    this.cruduserservice.deleteUser(id).subscribe(
      () => {
        console.log('Événement supprimé avec succès');
        this.getUsers()
      },
      (error) => {
        console.error(error);
      }
    );
      } else {
        console.log('User did not confirm');
      }
    });
  }


  getUserById(user : any) : any {
    this.id = user._id
    console.log('id',user) 
    this.cruduserservice.getUserById(this.id).subscribe(
      (res: any) => {

        const element = document.getElementById('update');
        element!.scrollIntoView({behavior: "smooth"});
        this.user = res.username
        this.userValue = this.user;
        console.log('dddddd',this.userValue)
        this.update = true;
        this.add = false;
        this.data = res;
        this.username.setValue(res.username);
        this.email.setValue(res.email);
        this.password.setValue(res.password);
        this.role.setValue(res.role); 
      },
      (error) => {
        console.error(error);
        
      }
    );
 
  }

  updateUser(){
    

    let user = {
      username : this.username.value,
      email : this.email.value,
      password: this.password.value,
      role: this.role.value,
    } 

    this.cruduserservice.updateUser(this.id,user).subscribe(
      () => {
        console.log('user mis à jour avec succès');
        this.addUserForm.reset();
        this.getUsers(); // rechargement de la liste des événements après la mise à jour
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  retourAdd(){
    this.update = false;
    this.add = true;
    this.addUserForm.reset();
  }

}
