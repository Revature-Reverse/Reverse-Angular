import { Injectable } from '@angular/core';
import { swearWords } from "swears";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  public checkForProfanity(message: string) : boolean {
    for (let word of swearWords) {
      if (message.indexOf(word) !== -1) {
        return true;
      }
    }
    return false;
  }
}
