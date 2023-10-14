import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionprofilsComponent } from './gestionprofils.component';

describe('GestionprofilsComponent', () => {
  let component: GestionprofilsComponent;
  let fixture: ComponentFixture<GestionprofilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionprofilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionprofilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
