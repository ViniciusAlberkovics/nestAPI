import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './../models/user.model';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly model: Model<UserModel>) { }

    private basePath = __dirname.substr(0, __dirname.lastIndexOf(path.sep));

    async get(): Promise<UserModel> {
        return await this.model.findOne().exec();
    }

    async create(model: UserModel): Promise<UserModel> {
        let user = new this.model(model);
        return await user.save();
    }

    async signUser(user: UserModel): Promise<string> {
        return await this.sign({ id: user._id, name: user.name, email: user.email, roles: user.roles })
    }
    
    async sign(paramsToken: any): Promise<string> {
        let privateKey = fs.readFileSync(`${this.basePath}${path.sep}keys${path.sep}private.key`, 'utf8');
        return await jwt.sign({ ...paramsToken }, privateKey, {
            expiresIn: 300,
            algorithm: 'RS256'
        });
    }
}