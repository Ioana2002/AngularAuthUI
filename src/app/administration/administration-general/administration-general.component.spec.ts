import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationGeneralComponent } from './administration-general.component';

describe('AdministrationGeneralComponent', () => {
  let component: AdministrationGeneralComponent;
  let fixture: ComponentFixture<AdministrationGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
