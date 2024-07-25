import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';
import { UserDTO } from './dto/users.dto';
import { HttpService } from 'nestjs-http-promise';
export declare class UsersService {
    readonly usersModel: Model<Users>;
    private readonly httpService;
    constructor(usersModel: Model<Users>, httpService: HttpService);
    getUsers(): Promise<any[]>;
    getUser(userID: string): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    createUser(createUserDTO: UserDTO): Promise<Users>;
    deleteUser(userID: String): Promise<any>;
    updateUser(userID: string, createUserDTO: UserDTO): Promise<any>;
    getArticlesServicePromise(page: Number, hits: Number): Promise<object>;
    validateIncomingData(data: any): void;
    insertArticlesOnDatabase(): Promise<any>;
}
