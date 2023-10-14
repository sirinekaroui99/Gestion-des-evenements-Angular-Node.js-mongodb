import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit{
  currentDateTime : any;
  month : any;
  day : any;
  joursSemaine = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  tab1: any[] = []
  tab2: any[] = []
  tab3: any[] = []
  tab4: any[] = []
  tab5: any[] = []
  moisActuel : any;
  dateActuelle : any;
  currentDay : any;
  currentMonth : any;

  constructor(public datepipe: DatePipe){
    console.log()
    this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    const date = new Date();
    this.currentMonth = this.datepipe.transform(date, 'MMMM');
    // Créer une nouvelle instance de la classe Date
    let dateActuelle = new Date();
    
    // Obtenir le jour actuel en utilisant la méthode getDay()
    let jourActuel = this.joursSemaine[dateActuelle.getDay()];
    
    // Afficher le jour actuel
    console.log('ffff',jourActuel); // le nom du jour de la semaine en toutes lettres
    
  }
  ngOnInit(): void {
    this.date();
    this.dateCalendrier()
  }

  date(){
    
    console.log(this.currentDateTime);
  }

  dateCalendrier(){
    
    // Créer une nouvelle instance de la classe Date
this.dateActuelle = new Date();

// Obtenir le mois et l'année actuels
this.moisActuel = this.dateActuelle.getMonth();
let anneeActuelle = this.dateActuelle.getFullYear();

// Obtenir le nombre de jours dans le mois actuel
let nbJoursMoisActuel = new Date(anneeActuelle, this.moisActuel + 1, 0).getDate();

// Créer un tableau pour stocker les jours du mois
let joursMois = [];

// Remplir le tableau avec les jours du mois
for (let i = 1; i <= nbJoursMoisActuel; i++) {
  let date = new Date(anneeActuelle, this.moisActuel, i);
  joursMois.push({
    jour: i,
    nomJour: date.toLocaleDateString('fr-FR', {weekday: 'long'}),
    estJourActuel: i === this.dateActuelle.getDate()
  });
}

//on prend l'indice du 1er jour du mois pour connaitre il correspond à quel jour de la semaine
let k = 0;
for (let i = 0; i < 7; i++){
  if(joursMois[0].nomJour== this.joursSemaine[i])
  {
    k = i;
  }
}

// initialiser les 1er jours du calendrier à x si ne convient pas avec les 1er jours du mois
let calendrier = [];
for (let i = 0; i < k; i++) {
  calendrier[i] = 'x'
}
//completer le tableau avec le reste des jours
for (let i = k; i < 36; i++) {
  calendrier[i-1] = joursMois[i-k].jour;
}
//completer le reste du calendrier vide avec des x
for(let i = calendrier.length; i<35 ; i++){
  calendrier[i] = 'x'
}
//on va diviser notre tableau sur 5 tableaux puisqu'on a 5 lignes dans le calendrier

for(let i=0 ; i <7; i++ )
{
  this.tab1[i] = calendrier[i];
}
for(let i=7 ; i <14; i++ )
{
  this.tab2[i-7] = calendrier[i];
}
for(let i=14 ; i <21; i++ )
{
  this.tab3[i-14] = calendrier[i];
}
for(let i=21 ; i <28; i++ )
{
  this.tab4[i-21] = calendrier[i];
}
for(let i=28 ; i <35; i++ )
{
  this.tab5[i-28] = calendrier[i];
}
//console.log(tab1, j)
for(let i=0 ; i <joursMois.length; i++ )
{
  if(joursMois[i].estJourActuel == true)
  {
    this.currentDay = joursMois[i].jour;
  }
}

  }

}
