import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudUserService } from 'src/app/services/crudUser/crud-user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit{


  username : any
  profiles : any = false;
  actualites : any = false;
  token : any
  data : any
  id : any
  constructor(private authservice : AuthService, private cruduserservice : CrudUserService,private router: Router){}

  ngOnInit(): void {
    this.token = this.authservice.isLoggedIn()
    this.data = jwt_decode(this.token)
    this.getUserById(this.data) 
    
  }


  logout(){

    localStorage.removeItem("currentUser")
    this.router.navigate(['/']);

  }

  gestion_profiles(){
    this.profiles = true
    this.actualites = false 
  }

  gestion_actualites(){
    this.actualites = true
    this.profiles = false

  }

  getUserById(user : any) : any {
    this.id = user._id
    console.log('id',user) 
    this.cruduserservice.getUserById(this.id).subscribe(
      (res: any) => {
        this.username = res.username
         
      },
      (error) => {
        console.error(error);
        
      }
    );
 
  }

}
