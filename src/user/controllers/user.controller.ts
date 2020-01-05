import { UserModel } from './../models/user.model';
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api/user')
export class UserController {
    constructor() { }


    @Get()
    async get() : Promise<UserModel> {
        return new UserModel();
    }

    @Post()
    async create(@Body() model: UserModel) {
        return model;
    }
}