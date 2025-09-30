export interface ICommentCreate{
    content: string;
    author_id: number;
    post_id: number;
}

export interface IComment{
    id: number;
    post_id: number;
    author_id: number;
    content: string;
    created_at: string;
    author_name: string;
}

export interface ICommentUpdate{
    comment_id: number | undefined;
    content?: string;
    author_id: number;
    post_id: number;
}