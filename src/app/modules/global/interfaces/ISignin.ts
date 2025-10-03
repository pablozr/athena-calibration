export interface ISigninResponse {
    user: {
        username: string;
        email: string;
        id: number;
        nomeCompleto: string;
        bio: string;
        dataNascimento: string;
    }
    acessToken: string;
}