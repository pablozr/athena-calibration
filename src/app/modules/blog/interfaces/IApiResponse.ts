import { IComment } from "./IComment";
import { IPost } from "./IPost";

export interface IApiResponsePosts {
    message: string;
    data: IPost[];
}

export interface IApiResponsePost {
    message: string;
    data: IPost;
}

export interface IApiResponseComment {
    message: string;
    data: IComment;
}

export interface IApiResponseComments {
    message: string;
    data: IComment[];
}

export interface IApiResponseDelete{
    message: string;
    data:{
        id: number;
    }
}