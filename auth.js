// Example stubs. Replace with your real auth.
module.exports.isAuthenticated = (req, res, next) => {
// Your app should populate req.user during auth.
if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
return next();
};


module.exports.isDoctor = (req, res, next) => {
if (!req.user || req.user.role !== 'doctor') return res.status(403).json({ error: 'Forbidden: doctor only' });
return next();
};