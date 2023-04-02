import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StergereEvenimentComponent } from './stergere-eveniment.component';

describe('StergereEvenimentComponent', () => {
  let component: StergereEvenimentComponent;
  let fixture: ComponentFixture<StergereEvenimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StergereEvenimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StergereEvenimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
