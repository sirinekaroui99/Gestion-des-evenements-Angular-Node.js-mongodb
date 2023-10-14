import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionactualitesComponent } from './gestionactualites.component';

describe('GestionactualitesComponent', () => {
  let component: GestionactualitesComponent;
  let fixture: ComponentFixture<GestionactualitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionactualitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionactualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
