import { UsersService } from "./users.service";
import { UserDTO } from "./dto/users.dto";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUsers(createUserDTO: UserDTO): Promise<{
        internalCode: number;
        message: string;
        payload: import("./interfaces/users.interface").Users;
    }>;
    getUsers(): Promise<{
        internalCode: number;
        message: string;
        payload: any[];
    }>;
    refreshDatabase(res: any, page: any, hits: any): Promise<{
        internalCode: number;
        message: string;
        payload: string;
    }>;
    getUser(userID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    }>;
    deleteUser(userID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    }>;
    updateUser(createUserDTO: UserDTO, userID: any): Promise<{
        internalCode: number;
        message: string;
        payload: any;
    }>;
    simpleStringify(object: any): Promise<string>;
}
