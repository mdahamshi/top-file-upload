import Errorpage from './pages/Errorpage';
import { createRoutesFromElements, Route } from 'react-router-dom';
import React from 'react';
import Root from './pages/Root';
import Logout from './components/Logout';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import Join from './pages/Join';
import Unjoin from './components/Unjoin';
import RegisterPage from './pages/Register';
import FileNew from './pages/FileNew';
import PrivateRoute from './pages/PrivateRoute';
import Folder from './components/Folder';
import NewFolder from './pages/NewFolder';
import FilePage from './pages/FilePage';
export const routefromelement = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route errorElement={<Errorpage />}>
      <Route
        index
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/join" element={<Join />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unjoin" element={<Unjoin />} />

      <Route
        path="/new/:id/file"
        element={
          <PrivateRoute>
            <FileNew />
          </PrivateRoute>
        }
      />
      <Route
        path="/new/:id/folder"
        element={
          <PrivateRoute>
            <NewFolder />
          </PrivateRoute>
        }
      />
      <Route
        path="/folders/:id"
        element={
          <PrivateRoute>
            <Folder />
          </PrivateRoute>
        }
      />
      <Route
        path="/files/:id"
        element={
          <PrivateRoute>
            <FilePage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Errorpage />} />
    </Route>
  </Route>
);
