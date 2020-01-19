import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly basePath = __dirname.substr(0, __dirname.lastIndexOf(path.sep));

    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

		if (request) {
			if (!request.headers.authorization) {
				throw new HttpException({ message: 'No token provided.' }, HttpStatus.UNAUTHORIZED);
			}
			request.user = await this.validateToken(request.headers.authorization);
			const roles = this.reflector.get<string[]>('roles', context.getClass());
			if (!roles) {
				return true;
			}
			const user = request.user;
			const hasRole = () => user.roles.some((role) => roles.includes(role));
			return user && user.roles && hasRole();
		}

		return false;
	}
	
	async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];

        try {
            let publicKey = fs.readFileSync(`${this.basePath}${path.sep}keys${path.sep}public.key`, 'utf8');
            const decoded: any = await jwt.verify(token, publicKey, { algorithms: 'RS256' });
            return decoded;
        } catch (err) {
            if (err.name === 'TokenExpiredError')
                throw new HttpException({ message: 'Expired token.' }, HttpStatus.UNAUTHORIZED);
            else
                throw new HttpException({ message: 'Failed to authenticate token.' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
