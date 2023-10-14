import { Component , OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { CrudUserService } from 'src/app/services/crudUser/crud-user.service';
import { DataService } from 'src/app/services/data/data.service';



@Component({
  selector: 'app-membreprofile',
  templateUrl: './membreprofile.component.html',
  styleUrls: ['./membreprofile.component.css']
})
export class MembreprofileComponent implements OnInit {
  username : any
  token : any
  data : any
  id : any
  ajouter : any
  pay = false;
  calendar = true;
  constructor(private dataservice : DataService ,private cruduserservice : CrudUserService, private authservice : AuthService,private router : Router  ){}

  ngOnInit(): void { 
    const cookieValue = this.authservice.getCookie('access_token');
    if(cookieValue){
      this.authservice.setGoogleToken(cookieValue)
      console.log('cookieValue',cookieValue);
    }
    this.token = this.authservice.isLoggedIn()
    console.log('ccccccccccccccc',this.token)
    this.data = jwt_decode(this.token)
    this.getUserById(this.data) 
   
    this.ajouter = this.dataservice.getData();
    console.log('ajpouter',this.ajouter)
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

  logout(){
    localStorage.removeItem("access_token")
    localStorage.removeItem("currentUser")
    this.router.navigate(['/']);

  }

  calendrier(){
   
    this.calendar = true
     this.pay = false
  }

  cotisation(){
    this.pay = true
    this.calendar = false
  }

}
