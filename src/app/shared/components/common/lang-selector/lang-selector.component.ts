// Core
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent implements OnInit {
  languages: string[];
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.languages = this.translate.getLangs();
  }

  selectLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
