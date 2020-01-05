import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './../models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly model: Model<UserModel>) { }

    async get(): Promise<UserModel> {
        return await this.model.findOne().exec();
    }

    async create(model: UserModel): Promise<UserModel> {
        let user = new this.model(model);
        return await user.save();
    }
}