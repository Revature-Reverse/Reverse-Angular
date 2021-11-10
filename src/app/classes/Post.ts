import {User} from "./user";
import {PostImage} from "./PostImage";
import {Comment} from "./Comment";

export interface Post {
    images?: any[];
    id?: number,
    poster?: User|number,
    title: string,
    body: string,
    created?: Date,
    lastEdited?: Date,
    likes?: User[],
    comments?: Comment[],
    post_images?: PostImage[],
    posterId?:number
}
