export interface IAuthToken{
    roles: string[];
    exp: number;
    iat: number;
    sub: string;
}