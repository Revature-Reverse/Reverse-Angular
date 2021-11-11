import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _toast: MatSnackBar) { }

    /**
     * Function: NotificationService.openToast(message: string, action: string)
     * Purpose: displays messages to the user when they log in or register as to whether the registration was successful and whatnot
     * @param message  The message for the notification to display to the user
     * @param action   Really did not use this: if used, it was allow the user to click and dismiss the nofification bar
     */
    openToast(message: string, action: string) {
      this._toast.open(message, action, {
        duration: 2500,
        verticalPosition: 'top',
        panelClass: ['login-toast', 'register-toast', 'add-post']
      });
    }
}
