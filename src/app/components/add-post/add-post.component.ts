import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  medium: any;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.medium = new MediumEditor('.editable', {});
    // If you wish to add existing HTML into it, you can do it like this.
    this.medium.setContent('<h2>MediumEditor<h2>');
  }

  ngOnChanges(change: any) {
    if (change.variable && change.variable.currentValue && this.medium) {
      this.medium.setContent(change.variable.currentValue);
    }
  }
}
