import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserModel } from './../models/user.model';
import { UserService } from './../services/user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly service: UserService) { }


    @Get()
    async get() : Promise<UserModel> {
        return this.service.get();
    }

    @Post()
    async create(@Body() model: UserModel) {
        return this.service.create(model);
    }
}