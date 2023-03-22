import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursiiGeneralComponent } from './excursii-general.component';

describe('ExcursiiGeneralComponent', () => {
  let component: ExcursiiGeneralComponent;
  let fixture: ComponentFixture<ExcursiiGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcursiiGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursiiGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
