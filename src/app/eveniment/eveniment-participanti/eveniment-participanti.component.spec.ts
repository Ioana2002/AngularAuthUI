import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenimentParticipantiComponent } from './eveniment-participanti.component';

describe('EvenimentParticipantiComponent', () => {
  let component: EvenimentParticipantiComponent;
  let fixture: ComponentFixture<EvenimentParticipantiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenimentParticipantiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenimentParticipantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
