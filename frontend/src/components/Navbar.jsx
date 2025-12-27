import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  CheckSquare,
  LogOut,
  LayoutDashboard,
  ListTodo,
  PlusSquare
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutuserMutation } from '../services/authAPI';
import { LogoutUser } from '../store/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Logoutuser] = useLogoutuserMutation();
  const user = useSelector((state) => state.authSlice.user);

  const handleLogout = async () => {
    try {
      await Logoutuser().unwrap(); 

      dispatch(LogoutUser()); 

      setIsOpen(false);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  const linkStyle =
    'text-slate-500 hover:text-blue-600 font-medium transition-colors flex items-center gap-2';
  const mobileLinkStyle =
    'block text-slate-600 font-medium hover:text-blue-600 py-2 flex items-center gap-2';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Task<span className="text-blue-600">Flow</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {user?.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className={linkStyle}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/admin/all-tasks" className={linkStyle}>
                  <ListTodo className="w-4 h-4" /> All Tasks
                </Link>
                <Link to="/admin/create-task" className={linkStyle}>
                  <PlusSquare className="w-4 h-4" /> Create Task
                </Link>
              </>
            )}

            {user?.role === 'user' && (
              <>
                <Link to="/dashboard" className={linkStyle}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/my-tasks" className={linkStyle}>
                  <ListTodo className="w-4 h-4" /> My Tasks
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200 shadow-sm">
                    {getInitials(user.username)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      {user.username}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase">
                      {user.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 font-semibold hover:text-blue-600">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {user && (
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                {getInitials(user.username)}
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg">
        </div>
      )}
    </nav>
  );
};

export default Navbar;
