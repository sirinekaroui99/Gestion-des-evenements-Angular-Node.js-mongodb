import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestionactualites',
  templateUrl: './gestionactualites.component.html',
  styleUrls: ['./gestionactualites.component.css']
})
export class GestionactualitesComponent {
  form!: FormGroup;
  selectedFile!: File;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Envoyer les données du formulaire au serveur
      console.log(this.form.value);
    }
  }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];
  }
}
