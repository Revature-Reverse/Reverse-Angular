import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  counter : number;
  counterInterval : any;

  constructor(
    private changeDetectorRef : ChangeDetectorRef
  ) { }

  // This method has a different form of implementation so that the "this" scope is not lost.
  handleRedirect = () => {
    if (this.counter === 0) {
      clearInterval(this.counterInterval);
      window.location.href = "/";
    } else {
      this.counter = this.counter - 1;
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit(): void {
    this.counter = 5;
    this.counterInterval = setInterval(this.handleRedirect, 1000);
  }

}
