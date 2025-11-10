// Authentication Middleware

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
};

const hasRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden' });
    };
};

const canEdit = (req, res, next) => {
    if (req.user && req.user.canEdit) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
};

module.exports = { isAuthenticated, hasRole, canEdit };