// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LangSelectorComponent } from './lang-selector.component';

describe('LangSelectorComponent', () => {
  let component: LangSelectorComponent;
  let fixture: ComponentFixture<LangSelectorComponent>;
  let de;

  const LANG_SELECTOR = '.lang-selector__item';
  const defaultLang = 'en';
  const lang = 'ru';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangSelectorComponent ],
      imports: [ TranslateModule.forRoot() ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('no languages by default (without app default config)', () => {
    const lang = de.nativeElement.querySelector(LANG_SELECTOR);
    expect(lang).toBeFalsy();
  });

  it('lang click should call selectLanguage', () => {
    const spy = spyOn(component, 'selectLanguage');
    component.languages = [lang, defaultLang];
    fixture.detectChanges();

    const langEl = de.nativeElement.querySelector(LANG_SELECTOR);
    langEl.click();

    expect(spy).toHaveBeenCalled();
  });

  it('selectLanguage should set language', () => {
    const spy = spyOn(component.translate, 'use');
    component.selectLanguage(lang);
    expect(spy).toHaveBeenCalledWith(lang);
  });
});
