const { ValidateSignature } = require('../../utils');

const auth = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if (isAuthorized) {
            return next();
        }
        return res.status(403).json({ message: 'Not Authorized' });
    } catch (err) {
        return res.status(403).json({ message: 'Authentication failed' });
    }
};

const isSeller = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if (isAuthorized && req.user && req.user.role === 'Seller') {
            return next();
        }
        return res.status(403).json({ message: 'Only sellers can perform this action' });
    } catch (err) {
        return res.status(403).json({ message: 'Authentication failed' });
    }
};

module.exports = { auth, isSeller };