import { Config } from './../../config';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './../models/user.model';
import * as md5 from 'md5';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
    constructor(@InjectModel('user') private readonly model: Model<UserModel>) { }

    async get(): Promise<UserModel> {
        return await this.model.findOne().exec();
    }

    async create(model: UserModel): Promise<UserModel> {
        model.password = md5(model.password);
        let user = new this.model(model);
        return await user.save();
    }

    async login(model: UserModel): Promise<string | any> {
        try {
            let userDb = await this.model.findOne({ email: model.email });
            if (userDb) {
                if (userDb.password === md5(model.password)) {
                    if (userDb.active) {
                        let token = await this.signUser(userDb);
                        return token;
                    } else {
                        return { message: 'Inactive user.' };
                    }
                } else {
                    return { message: 'Incorrect password.' };
                }
            } else {
                return { message: 'Unregistered user.' };
            }
        } catch (error) {
            throw error;
        }
    }

    private async signUser(user: UserModel): Promise<string> {
        return await this.sign({ id: user._id, name: user.name, email: user.email, roles: user.roles })
    }

    private async sign(paramsToken: any): Promise<string> {
        let privateKey = fs.readFileSync(`${Config.BasePath}${path.sep}keys${path.sep}private.key`, 'utf8');
        return await jwt.sign({ ...paramsToken }, privateKey, {
            expiresIn: 300,
            algorithm: 'RS256'
        });
    }
}