import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutEventComponent } from './modal-ajout-event.component';

describe('ModalAjoutEventComponent', () => {
  let component: ModalAjoutEventComponent;
  let fixture: ComponentFixture<ModalAjoutEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjoutEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
