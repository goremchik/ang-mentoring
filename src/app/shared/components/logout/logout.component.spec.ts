// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let de;

  const SELECTOR_LINK = 'a';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
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

    expect(console.log).toHaveBeenCalledWith('Logout');
  });
});
