import { IUsers } from "./IUser";

export interface IApiResponseUsers{
    message: string;
    data: IUsers[];
}

export interface IApiDeleteResponse{
    message: string;
    data: number;
}