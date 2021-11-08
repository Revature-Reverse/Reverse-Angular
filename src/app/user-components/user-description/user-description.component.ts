import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../classes/Post";
import {User} from "../../user";

@Component({
  selector: 'app-user-description',
  templateUrl: './user-description.component.html',
  styleUrls: ['./user-description.component.css']
})
export class UserDescriptionComponent implements OnInit {


  @Input('user')
  user?: User;

  @Input('editable')
  editable?: Boolean;


  constructor() { }

  ngOnInit(): void {
    console.log(this.editable)
  }

}
