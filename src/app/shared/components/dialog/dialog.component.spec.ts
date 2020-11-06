import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let de;

  const SELECTOR_CONFIRM = '.dialog__confirm';
  const SELECTOR_CANCEL = '.dialog__cancel';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    component.hasActions = true;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onConfirmClick', () => {
    const spy = spyOn(component, 'onConfirmClick');
    const button = de.nativeElement.querySelector(SELECTOR_CONFIRM);
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('onConfirmClick should close dialog and emit confirm event', () => {
    const closeSpy = spyOn(component, 'close');
    const emitSpy = spyOn(component.confirm, 'emit');
    component.onConfirmClick();

    expect(closeSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call onCancelClick', () => {
    const spy = spyOn(component, 'onCancelClick');
    const button = de.nativeElement.querySelector(SELECTOR_CANCEL);
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('onCancelClick should close dialog and emit cancel event', () => {
    const closeSpy = spyOn(component, 'close');
    const emitSpy = spyOn(component.cancel, 'emit');
    component.onCancelClick();

    expect(closeSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});
