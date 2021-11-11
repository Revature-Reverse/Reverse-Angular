import { Component, OnInit } from '@angular/core';
import * as MediumEditor from 'medium-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../classes/Post';
import { PostService } from '../../services/post.service';
import POSTS from '../../POSTS';
import { User } from '../../classes/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import {FilterService} from "../../services/filter.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  medium: any;
  postform!: FormGroup;
  post!: Post;
  title!: string;
  imageSrc?:any;
  images?:any[]=[];
  constructor(
    private userService: UserService,

    private postService: PostService,
    private filterService: FilterService,
    private formBuilder: FormBuilder,
    private notify: NotificationService
  ) {}

    //the toaster
    // openToast(message: string, action: string)
    // {
    //   this._toast.open(message, action, {duration: 2500, verticalPosition:'top', panelClass:['login-toast', 'register-toast']});
    // }

  ngAfterViewInit() {
    this.medium = new MediumEditor('.editable', {
      toolbar: {
        static: true,
        sticky: true,
        updateOnEmptySelection: true,
      },
    });
  }

  ngOnInit(): void {
    this.postform = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  get f() {
    return this.postform.controls;
  }

  onSubmit() {
    let user = this.userService.currentUserValue.id;
    this.post = {
      title: this.title,
      body: this.medium.getContent(),
      posterId: user,
      images: this.images
    };

    if (this.filterService.checkForProfanity(this.post.body) || this.filterService.checkForProfanity(this.post.title)) {
      this.notify.openToast("The post cannot contain profanity.", "");
    } else {
      this.postService
      .savePost(this.post)
      .toPromise()
      .then(
        (res: any) => {
          console.log(res);
        },
        (error) => {
          this.notify.openToast('Please fill out all required fields.', "");
        }
      );
      // .catch((err) => {
      //   console.log('Please fill out all required fields.');
      // });
    }
  }

  ngOnChanges(change: any) {
    if (change.variable && change.variable.currentValue && this.medium) {
      this.medium.setContent(change.variable.currentValue);
    }
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    let files = event.target.files;
    let readers=[];
    if(!files.length) return;
    let imglist:any;
    let imgfilenames:any[]=[];

    // Store promises in array
    for(let i = 0;i < files.length;i++){
      readers.push(this.readFileAsText(files[i]));
      imgfilenames.push(files[i].name);
    }

    // Trigger Promises
    Promise.all(readers).then((values) => {
      // Values will be an array that contains an item
      // with the text of every selected file
      // ["File1 Content", "File2 Content" ... "FileN Content"]
      console.log(files);

      console.log(values);
      imglist =values;
      console.log(imgfilenames);

    }).then(()=>{
      for(let i = 0;i < files.length;i++){
        this.images.push(
          {
            bytes:imglist[i].split(',')[1],
            imageTitle:imgfilenames[i].substring(0, imgfilenames[i].length - 4)
          }
        );
      }
      console.log(this.images)
      }
    );

    //if (event.target.files && event.target.files.length) {
    //  event.target.files.forEach((item:any)=>{
    //    reader.readAsDataURL(item);
    //    this.images.push(
    //      {
    //        url:reader.result as string,
    //        filename:item.filename
    //      }
    //    );
    //  })
    //  console.log(this.images)
//
    //}
  }
   readFileAsText(file: any){
    return new Promise(function(resolve,reject){
      let fr = new FileReader();
      fr.readAsDataURL(file);

      fr.onload = function(){
        resolve(fr.result as string);
      };

      fr.onerror = function(){
        reject(fr);
      };

    });
  }
}
