import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MessageService } from './services/message.service';
import { Module } from '@nestjs/common';
import { MessageController } from './controllers/message.controller';
import { MessageSchema } from './schemas/message.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'message', schema: MessageSchema, collection: 'message' }])],
    controllers: [MessageController],
    providers: [MessageService]
})
export class MessageModule { }
