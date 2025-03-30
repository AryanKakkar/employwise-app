import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import EditUserPage from './pages/EditUserPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditUserPage />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;