import foldersRoutes from './folders.js';
import filesRoutes from './files.js';
import usersRoutes from './users.js';
import authRoutes from './auth.js';

function registerRoutes(app, apiV) {
  app.use(`/api/${apiV}/users`, usersRoutes);
  app.use(`/api/${apiV}/files`, filesRoutes);
  app.use(`/api/${apiV}/folders`, foldersRoutes);
  app.use(`/api/${apiV}/auth`, authRoutes);
}

export default registerRoutes;
