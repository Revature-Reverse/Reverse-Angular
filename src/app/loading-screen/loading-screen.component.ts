import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from "src/app/services/loading-screen.service";
import { Subscription } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  loadingSubscription?: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.pipe(
      debounceTime(200)
    ).subscribe((value:any) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
