import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class UserDTO {
    @ApiPropertyOptional()
    readonly _id?: string;
    @ApiProperty()
    readonly  email: string;
    @ApiProperty()
    readonly  password: string;


    constructor(_id: string, email: string, password: string ) {
        this._id = _id;
        this.email = email;
        this.password = password;
    }
}



export {
    UserDTO,
}