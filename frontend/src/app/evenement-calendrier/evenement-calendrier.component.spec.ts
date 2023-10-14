import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementCalendrierComponent } from './evenement-calendrier.component';

describe('EvenementCalendrierComponent', () => {
  let component: EvenementCalendrierComponent;
  let fixture: ComponentFixture<EvenementCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementCalendrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
