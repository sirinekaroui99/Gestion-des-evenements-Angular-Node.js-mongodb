import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreprofileComponent } from './membreprofile.component';

describe('MembreprofileComponent', () => {
  let component: MembreprofileComponent;
  let fixture: ComponentFixture<MembreprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
