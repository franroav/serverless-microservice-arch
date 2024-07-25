declare class UserDTO {
    readonly _id?: string;
    readonly email: string;
    readonly password: string;
    constructor(_id: string, email: string, password: string);
}
export { UserDTO, };
