import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageModel } from './../models/message.model';

@Injectable()
export class MessageService {
    constructor(@InjectModel('message') private readonly model: Model<MessageModel>) { }

    async get(): Promise<MessageModel[]> {
        return await this.model.find().exec();
    }

    async create(model: MessageModel): Promise<MessageModel> {
        let Message = new this.model(model);
        return await Message.save();
    }
}