import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/users.schema';
import { HttpModule } from 'nestjs-http-promise'//'@nestjs/axios';
@Module({
    imports: [HttpModule, MongooseModule.forFeature([{name: 'Users', schema: UserSchema}])],
    controllers: [AppController, UsersController],
    providers: [AppService, UsersService]
})
export class UsersModule {}

