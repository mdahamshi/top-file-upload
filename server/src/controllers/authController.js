import passport from 'passport';
import { sanitizeUser } from '../utils/sanitize.js';
import db from '../db/db.js';

export const authLogin = async (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ user: req.user, message: 'Already authenticated!' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: info?.error || 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
};

export const authLogout = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logout successful' });
  });
};
