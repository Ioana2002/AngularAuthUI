import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenimentAddComponent } from './eveniment-add.component';

describe('EvenimentAddComponent', () => {
  let component: EvenimentAddComponent;
  let fixture: ComponentFixture<EvenimentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenimentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenimentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
