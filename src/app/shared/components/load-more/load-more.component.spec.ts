// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LoadMoreComponent } from './load-more.component';

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent;
  let fixture: ComponentFixture<LoadMoreComponent>;
  let de;

  const SELECTOR_LINK = 'a';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadMoreComponent ],
      imports: [ TranslateModule.forRoot() ],
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

    const link = de.nativeElement.querySelector(SELECTOR_LINK);
    link.click();

    expect(component.onClick).toHaveBeenCalled();
  });

  it('onClick should call console log', () => {
    spyOn(component.loadMore, 'emit');
    component.onClick();

    expect(component.loadMore.emit).toHaveBeenCalled();
  });
});
