export interface Post {
    id?: number,
    user_id: number;
    content: string,
    title: String;
    comments?: any[],
    time?: Date
}
