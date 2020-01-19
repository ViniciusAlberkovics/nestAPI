import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserModel } from './../models/user.model';
import { UserService } from './../services/user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    get() {
        return this.service.get();
    }

    @Post()
    create(@Body() model: UserModel) {
        return this.service.create(model);
    }

    @Post('/login')
    login(@Body() model: UserModel) {
        return this.service.login(model);
    }
}