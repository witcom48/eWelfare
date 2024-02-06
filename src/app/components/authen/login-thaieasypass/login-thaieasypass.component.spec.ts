import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginThaieasypassComponent } from './login-thaieasypass.component';

describe('LoginThaieasypassComponent', () => {
  let component: LoginThaieasypassComponent;
  let fixture: ComponentFixture<LoginThaieasypassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginThaieasypassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginThaieasypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
