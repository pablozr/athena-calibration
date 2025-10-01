import { ITodo } from "./ITodo";

export interface IApiResponseTodos{
    message: string;
    data: ITodo[];
}

export interface IApiResponseTodo{
    message: string;
    data: ITodo;
}

export interface IApiResponseDelete{
    message: string;
    data: number; // retorna o deleted count
}