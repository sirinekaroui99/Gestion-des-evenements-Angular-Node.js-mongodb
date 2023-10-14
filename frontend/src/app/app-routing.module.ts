import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteComponent } from './actualite/actualite.component';
import { SignupComponent } from './signup/signup.component';
import { EvenementComponent } from './evenement/evenement.component';
import { HomeComponent } from './home/home.component';
import { EvenementCalendrierComponent } from './evenement-calendrier/evenement-calendrier.component';
import { AdminprofileComponent } from './profile/adminprofile/adminprofile.component';
import { MembreprofileComponent } from './profile/membreprofile/membreprofile.component';
import { GestionprofilsComponent } from './gestions/gestionprofils/gestionprofils.component';
import { GestionactualitesComponent } from './gestions/gestionactualites/gestionactualites.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthComponent } from './auth/auth.component';
import { AjoutComponent } from './ajout/ajout.component';
import { CotisationComponent } from './cotisation/cotisation.component';

const routes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'evenements', component: EvenementCalendrierComponent },
  { path: 'actualites', component: ActualiteComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin',component:AdminprofileComponent},
  { path: 'membre', component:MembreprofileComponent }, 
  { path: 'calendar', component:CalendarComponent }, 
  { path:'auth', component:AuthComponent },
  { path:'ajout', component:AjoutComponent },
  { path:'cotisation', component: CotisationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
