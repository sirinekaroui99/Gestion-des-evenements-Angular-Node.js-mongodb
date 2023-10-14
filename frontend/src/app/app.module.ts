import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { EvenementComponent } from './evenement/evenement.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';  
import { CalendarComponent } from './calendar/calendar.component';
import { CardComponent } from './card/card.component';
import { DatePipe } from '@angular/common';
import { EvenementCalendrierComponent } from './evenement-calendrier/evenement-calendrier.component';
import { BootstrapModule } from 'src/bootstrap.module'; 
import { ModalModule } from 'ngx-bootstrap/modal';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalEventComponent } from './modal-event/modal-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAjoutEventComponent } from './modal-ajout-event/modal-ajout-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { AdminprofileComponent } from './profile/adminprofile/adminprofile.component';
import { MembreprofileComponent } from './profile/membreprofile/membreprofile.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { GestionprofilsComponent } from './gestions/gestionprofils/gestionprofils.component';
import { GestionactualitesComponent } from './gestions/gestionactualites/gestionactualites.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';  
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AjoutComponent } from './ajout/ajout.component';
import { CotisationComponent } from './cotisation/cotisation.component';

const firebaseConfig = {
  apiKey: "AIzaSyBosurp6U9ERGuAXfBdzUXSzPiubKpkiAo",
  authDomain: "calendar-ea327.firebaseapp.com",
  projectId: "calendar-ea327",
  storageBucket: "calendar-ea327.appspot.com",
  messagingSenderId: "533898342916",
  appId: "1:533898342916:web:7d4e6ca72f5c9ad75f3b51",
  measurementId: "G-DHSV5J07NZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActualiteComponent,
    CotisationComponent,
    EvenementComponent,
    SignupComponent,
    LoginComponent,
    CardComponent,
    EvenementCalendrierComponent,
    ModalEventComponent,
    ModalAjoutEventComponent,
    ModalConfirmComponent,
    AdminprofileComponent,
    MembreprofileComponent,
    GestionprofilsComponent,
    GestionactualitesComponent,
    CalendarComponent,
    AjoutComponent


  ],
  imports: [
    
    HttpClientModule,
    BrowserModule,
    NgbModalModule,
    FormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    
    MatDatepickerModule,
    MatIconModule,
    MatCardModule, 
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FullCalendarModule,  
    BootstrapModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    

  ], 
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
 