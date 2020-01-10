import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessageModel } from './../models/message.model';
import { MessageService } from './../services/message.service';

@Controller('api/message')
export class MessageController {
    constructor(private readonly service: MessageService) { }


    @Get()
    async get() : Promise<MessageModel[]> {
        return this.service.get();
    }

    @Post()
    async create(@Body() model: MessageModel) {
        return this.service.create(model);
    }
}