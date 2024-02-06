import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSsoComponent } from './login-sso.component';

describe('LoginSsoComponent', () => {
  let component: LoginSsoComponent;
  let fixture: ComponentFixture<LoginSsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
