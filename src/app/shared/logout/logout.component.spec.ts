import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let de;

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

    const link = de.nativeElement.querySelector('a');
    link.click();

    return fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  });

  it('onClick should call console log', () => {
    spyOn(console, 'log');
    component.onClick();

    return fixture.whenStable().then(() => {
      expect(console.log).toHaveBeenCalledWith('Logout');
    });
  });
});
