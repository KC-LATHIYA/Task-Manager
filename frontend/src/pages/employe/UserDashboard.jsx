import React from 'react';
import UserLayout from './UserLayout';
import { Clock, CheckCircle2, AlertOctagon, ArrowRight, Calendar, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMyTaskQuery } from '../../services/employeAPI';

const UserDashboard = () => {

  const user = useSelector((state) => state.authSlice.user);
  const { data: apiResponse, isLoading, isError, error, refetch } = useGetMyTaskQuery();
  
  const tasks = apiResponse?.data || [];

  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const highPriorityPendingCount = tasks.filter(t => t.priority === 'high' && t.status === 'pending').length;

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      </UserLayout>
    );
  }

  if (isError) {
    return (
      <UserLayout>
        <div className="flex flex-col h-[80vh] items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Failed to load dashboard</h2>
          <p className="text-slate-500 mb-6">{error?.data?.message || "Something went wrong"}</p>
          <button onClick={refetch} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Hello, {user?.username || 'User'}! 👋</h1>
        <p className="text-slate-500 mt-1">Here is your daily briefing. You have <span className="text-blue-600 font-bold">{tasks.filter(t => t.status !== 'completed').length} active tasks</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><Clock className="w-6 h-6 text-white" /></div>
                 <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">Active</span>
              </div>
              <h3 className="text-4xl font-bold mb-1">{inProgressCount}</h3>
              <p className="text-blue-100 font-medium">Tasks In Progress</p>
           </div>
           <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
           <div className="flex justify-between items-start mb-4">
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>
           </div>
           <h3 className="text-4xl font-bold text-slate-800 mb-1">{completedCount}</h3>
           <p className="text-slate-500 font-medium">Completed Tasks</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
           <div className="flex justify-between items-start mb-4">
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors"><AlertOctagon className="w-6 h-6 text-red-600" /></div>
           </div>
           <h3 className="text-4xl font-bold text-slate-800 mb-1">{highPriorityPendingCount}</h3>
           <p className="text-slate-500 font-medium">High Priority Pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-lg text-slate-800">Recent Assignments</h3>
               <Link to="/my-tasks" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
            
            {tasks.length === 0 ? (
                <div className="text-center text-slate-500 py-8">No tasks assigned yet.</div>
            ) : (
                <div className="space-y-4">
                {tasks
                    .filter(t => t.status !== 'completed')
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                    .slice(0, 3) 
                    .map((task) => (
                    <div key={task._id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer border border-transparent hover:border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className={`w-2 h-12 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                            <div>
                                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{task.title}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> 
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded border capitalize 
                                        ${task.status === 'in-progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-white text-slate-600 border-slate-200'}`}>
                                        {task.status.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link to={`/task/${task._id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                ))}
                </div>
            )}
         </div>

         <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
               <h3 className="font-bold text-lg mb-2">Team Announcement</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  "Great work everyone! Ensure all high-priority tasks are updated by EOD. Let's keep the momentum going!"
               </p>
               <div className="flex items-center gap-3 border-t border-slate-700 pt-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs text-white">AD</div>
                  <div>
                     <p className="text-sm font-bold">Admin Team</p>
                     <p className="text-xs text-slate-500">Project Management</p>
                  </div>
               </div>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
         </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;