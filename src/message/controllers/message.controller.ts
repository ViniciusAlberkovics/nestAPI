import { AuthGuard } from './../../middlewares/auth.guard';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MessageModel } from './../models/message.model';
import { MessageService } from './../services/message.service';
import { Roles } from '../../middlewares/decorators/role.decorators';

@Controller('api/message')
@Roles('admin')
@UseGuards(AuthGuard)
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