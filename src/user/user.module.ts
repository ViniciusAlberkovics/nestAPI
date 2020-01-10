import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema, collection: 'user' }])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }
