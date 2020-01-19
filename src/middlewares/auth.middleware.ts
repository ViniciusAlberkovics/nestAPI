import * as path from 'path';

export class AuthMiddleware {
    private basePath = __dirname.substr(0, __dirname.lastIndexOf(path.sep));

    apiAuthorization = (req, res, next) => {
        let authorization = req.headers['api-authorization'];
        if (!authorization || authorization !== 'Catapimbas')
            return res.status(403).json({ message: 'Denied access.' });
        
        next();
    }
}