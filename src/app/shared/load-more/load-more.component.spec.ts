import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreComponent } from './load-more.component';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;
  let de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreComponent);
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
    spyOn(component.loadMore, 'emit');
    component.onClick();

    return fixture.whenStable().then(() => {
      expect(component.loadMore.emit).toHaveBeenCalled();
    });
  });
});
