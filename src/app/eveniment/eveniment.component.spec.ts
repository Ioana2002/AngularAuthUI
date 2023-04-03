import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenimentComponent } from './eveniment.component';

describe('EvenimentComponent', () => {
  let component: EvenimentComponent;
  let fixture: ComponentFixture<EvenimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
