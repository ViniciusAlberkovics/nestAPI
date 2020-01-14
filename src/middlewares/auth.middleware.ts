const path = require('path')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const basePath = __dirname.substr(0, __dirname.lastIndexOf(path.sep));

exports.apiAuthorization = (req, res, next) => {
    let authorization = req.headers['api-authorization'];
    if (!authorization || authorization !== 'Catapimbas')
        return res.status(403).json({ message: 'Denied access.' });

    next();
}

exports.verifyJWT = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: 'No token provided.' });

    let publicKey = fs.readFileSync(`${basePath}${path.sep}keys${path.sep}public.key`, 'utf8');
    jwt.verify(token, publicKey, { algorithms: 'RS256' }, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError')
                return res.status(401).json({ message: 'Expired token.' });
            else
                return res.status(500).json({ message: 'Failed to authenticate token.' });
        }

        req.userInfo = {
            id: decoded.id,
            roles: decoded.roles
        }

        if (next)
            next();
    });
}

exports.verifyJWTRoles = (roles, req, res, next) => {
    this.verifyJWT(req, res, null);
    if (!res.finished) {
        let authorize = false;
        if (Array.isArray(roles)) {
            roles.forEach(r => {
                if (req.userInfo.roles.includes(r)) {
                    authorize = true;
                }
            });
        } else if (req.userInfo.roles.includes(roles)) {
            authorize = true;
        }

        if (authorize) {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized user.' });
        }
    }
}