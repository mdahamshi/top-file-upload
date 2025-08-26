import db from '../db/db.js';

export const ensureShareExist = async (req, res, next) => {
  const { token, id } = req.params;
  let item;
  if (token) item = await db.sharelink.getByToken(token);
  else item = await db.sharelink.getById(id);
  if (!item) return res.status(404).json({ error: 'ShareLink not found' });

  if (item.expiresAt && new Date() > item.expiresAt) {
    await db.sharelink.delete(item.id);
    return res.status(410).json({ error: 'ShareLink expired' });
  }
  return next();
};
