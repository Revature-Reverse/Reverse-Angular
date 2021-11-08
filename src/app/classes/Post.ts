import {User} from "../user";
import {PostImage} from "./PostImage";
import {Comment} from "./Comment";

export interface Post {
    id?: number,
    poster: User,
    title: string,
    body: string,
    created?: Date,
    lastEdited?: Date,
    likes?: User[],
    comments?: Comment[],
    post_images?: PostImage[]
}
