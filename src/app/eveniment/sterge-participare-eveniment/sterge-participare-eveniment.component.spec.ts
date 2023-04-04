import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StergeParticipareEvenimentComponent } from './sterge-participare-eveniment.component';

describe('StergeParticipareEvenimentComponent', () => {
  let component: StergeParticipareEvenimentComponent;
  let fixture: ComponentFixture<StergeParticipareEvenimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StergeParticipareEvenimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StergeParticipareEvenimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
