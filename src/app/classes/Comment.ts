import {User} from "../user";

export interface Comment {
  id?: number,
  commenter: User,
  post_id: number,
  message: string,
  created?: Date
}
