import { IComment } from "./IComment";

export interface IPost{
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: string;
    post_author_name: string;
    first_comment_id?: number;
    first_comment_content?: string;
    first_comment_author_id?: number;
    first_comment_created_at?: string;
    first_comment_author_name?: string;
    comments?: IComment[];
    commentsShown?: boolean;
    total_comments?: number;
}

export interface IPostCreate{
    title: string;
    content: string;
    author_id: number;
}

export interface IPostUpdate{
    post_id: number;
    title?: string;
    content?: string;
    author_id: number;
}