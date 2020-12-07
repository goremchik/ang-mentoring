// Core
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Services
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isShown$$: BehaviorSubject<boolean>;

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    this.isShown$$ = this.loader.loaderStatus$$;
  }
}
