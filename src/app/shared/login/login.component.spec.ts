// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de;

  const SELECTOR_LINK = 'a';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onClick', () => {
    spyOn(component, 'onClick');

    const link = de.nativeElement.querySelector(SELECTOR_LINK);
    link.click();

    expect(component.onClick).toHaveBeenCalled();
  });

  it('onClick should call console log', () => {
    spyOn(console, 'log');
    component.onClick();

    expect(console.log).toHaveBeenCalledWith('Login');
  });
});
