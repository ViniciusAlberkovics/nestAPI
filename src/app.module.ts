import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Config } from './config';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UserModule,
    MessageModule,
    MongooseModule.forRoot(Config.ConnectionString)
  ]
})
export class AppModule {}
