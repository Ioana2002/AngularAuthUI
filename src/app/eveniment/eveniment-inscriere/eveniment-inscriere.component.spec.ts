import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenimentInscriereComponent } from './eveniment-inscriere.component';

describe('EvenimentInscriereComponent', () => {
  let component: EvenimentInscriereComponent;
  let fixture: ComponentFixture<EvenimentInscriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenimentInscriereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenimentInscriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
