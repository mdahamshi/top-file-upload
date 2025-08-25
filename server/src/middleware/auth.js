export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
};

export const ensureAdmin = (req, res, next) => {
  if (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    req.user.role === 'admin'
  ) {
    return next();
  }
  res.status(403).json({ error: 'Admin access required' });
};
