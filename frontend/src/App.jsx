import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { useMyprofileQuery } from './services/authAPI';
import Layout from './layout/Layout';
import PrivateRoute from './components/ProtectedRoutes';
import Unauthorized from './components/Unauthorized';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllTasks from './pages/admin/AllTasks';
import CreateTask from './pages/admin/CreateTask';
import UpdateTask from './pages/admin/UpdateTask';
import UserDashboard from './pages/employe/UserDashboard';
import MyTasks from './pages/employe/TaskCard';
import TaskDetails from './pages/employe/TaskDetails';
import ManageUsers from './pages/admin/ManageUsers';

function App() {
  const { isLoading } = useMyprofileQuery();
  const user = useSelector((state) => state.authSlice.user);

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/unauthorized', element: <Unauthorized /> },

        {
          path: '/admin/dashboard',
          element: (
            <PrivateRoute role="admin" user={user} isLoading={isLoading}>
              <AdminDashboard />
            </PrivateRoute>
          )
        },
        {
          path: '/admin/all-tasks',
          element: (
            <PrivateRoute role="admin" user={user} isLoading={isLoading}>
              <AllTasks />
            </PrivateRoute>
          )
        },
        {
          path: '/admin/create-task',
          element: (
            <PrivateRoute role="admin" user={user} isLoading={isLoading}>
              <CreateTask />
            </PrivateRoute>
          )
        },
        {
          path: '/admin/update-task/:id',
          element: (
            <PrivateRoute role="admin" user={user} isLoading={isLoading}>
              <UpdateTask />
            </PrivateRoute>
          )
        },
        {
          path: '/admin/users',
          element: (
            <PrivateRoute role="admin" user={user} isLoading={isLoading}>
              <ManageUsers />
            </PrivateRoute>
          )
        },

        {
          path: '/dashboard',
          element: (
            <PrivateRoute role="user" user={user} isLoading={isLoading}>
              <UserDashboard />
            </PrivateRoute>
          )
        },
        {
          path: '/my-tasks',
          element: (
            <PrivateRoute role="user" user={user} isLoading={isLoading}>
              <MyTasks />
            </PrivateRoute>
          )
        },
        {
          path: '/task/:id',
          element: (
            <PrivateRoute role="user" user={user} isLoading={isLoading}>
              <TaskDetails />
            </PrivateRoute>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;