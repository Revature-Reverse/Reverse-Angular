import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toast: MatSnackBar) { }

    //the toaster
    openToast(message: string, action: string) {
      this._toast.open(message, action, {
        duration: 2500,
        verticalPosition: 'top',
        panelClass: ['login-toast', 'register-toast', 'add-post']
      });
    }
}
