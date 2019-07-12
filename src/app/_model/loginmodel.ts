export class LoginRequestModel {
    userName: string;
    password: string;
}
export class LoginResponse {
    status: boolean;
    authToken: string;
    userDisplayName: string;
}
