import {User} from "./user";

export interface Comment {
  id?: number,
  commenter?: User,
  postId: number,
  message: string,
  created?: Date,
  userId?:number
}
