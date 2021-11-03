export interface Post {
    id?: number,
    content: string,
    user_id: number,
    comments?: any[],
    time?: Date
}
