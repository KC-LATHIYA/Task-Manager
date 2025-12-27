import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListTodo, PlusSquare, Users, LogOut, CheckSquare, Menu, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useLogoutuserMutation } from '../../services/authAPI';
import { LogoutUser } from '../../store/authSlice';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutuserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(LogoutUser());
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => location.pathname === path 
    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
    : "text-slate-400 hover:bg-slate-800 hover:text-white";

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-slate-50">
      
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-30 shadow-md">
        <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1 rounded-md">
                <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">Task<span className="text-blue-500">Flow</span> Admin</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-300 hover:text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeSidebar}
        ></div>
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:h-screen
      `}>
        <div className="hidden md:flex h-16 items-center px-6 border-b border-slate-800">
           <CheckSquare className="h-6 w-6 text-blue-500 mr-2" />
           <span className="text-xl font-bold tracking-tight">Task<span className="text-blue-500">Flow</span></span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 mt-14 md:mt-0">
          <Link to="/admin/dashboard" onClick={closeSidebar} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/dashboard')}`}>
            <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/all-tasks" onClick={closeSidebar} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/all-tasks')}`}>
            <ListTodo size={20} /> <span className="font-medium">All Tasks</span>
          </Link>
          <Link to="/admin/create-task" onClick={closeSidebar} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/create-task')}`}>
            <PlusSquare size={20} /> <span className="font-medium">Create Task</span>
          </Link>
          <Link to="/admin/users" onClick={closeSidebar} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/admin/users')}`}>
            <Users size={20} /> <span className="font-medium">Users</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut size={20} /> <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto w-full bg-slate-50">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;