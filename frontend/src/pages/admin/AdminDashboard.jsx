import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { TrendingUp, CheckCircle, Clock, AlertTriangle, ArrowUpRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useGetAllTaskQuery } from '../../services/adminAPI'; // Adjust path

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
        Active <ArrowUpRight size={12} className="ml-1" />
      </span>
    </div>
    <h3 className="text-3xl font-bold text-slate-800 mb-1">{value}</h3>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <p className="text-slate-400 text-xs mt-2">{subtext}</p>
  </div>
);

const AdminDashboard = () => {
  const { data: apiResponse, isLoading, isError, error, refetch } = useGetAllTaskQuery();
  
  const tasks = apiResponse?.data || [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;

  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusColor = (s) => {
    switch(s) {
      case 'completed': return 'bg-green-50 text-green-700 ring-green-600/20';
      case 'in-progress': return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
      default: return 'bg-slate-50 text-slate-600 ring-slate-500/10';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="flex flex-col h-[80vh] items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Failed to load dashboard</h2>
          <p className="text-slate-500 mb-6">{error?.data?.message || "Something went wrong"}</p>
          <button onClick={refetch} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening with your projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
            title="Total Tasks" 
            value={totalTasks} 
            subtext="All active projects" 
            icon={TrendingUp} 
            color="bg-blue-600" 
        />
        <StatCard 
            title="Completed" 
            value={completedTasks} 
            subtext="Tasks finished" 
            icon={CheckCircle} 
            color="bg-green-500" 
        />
        <StatCard 
            title="In Progress" 
            value={inProgressTasks} 
            subtext="Currently working" 
            icon={Clock} 
            color="bg-orange-500" 
        />
        <StatCard 
            title="High Priority" 
            value={highPriorityTasks} 
            subtext="Needs attention" 
            icon={AlertTriangle} 
            color="bg-red-500" 
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Recent Task Assignments</h3>
          <Link to="/admin/all-tasks" className="text-blue-600 text-sm font-semibold hover:underline">View All</Link>
        </div>
        
        {tasks.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No recent activity found.</div>
        ) : (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Task Title</th>
                <th className="p-4 font-semibold">Assigned To</th>
                <th className="p-4 font-semibold">Priority</th>
                <th className="p-4 font-semibold">Due Date</th>
                <th className="p-4 font-semibold">Status</th>
                </tr>
            </thead>
            <tbody className="text-slate-700 text-sm">
                {tasks.slice(0, 5).map((task) => (
                <tr key={task._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900 max-w-xs truncate" title={task.title}>
                        {task.title}
                    </td>
                    <td className="p-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold uppercase">
                                {task.assignedTo?.username?.charAt(0) || '?'}
                            </div>
                            <span className="truncate max-w-[100px]">{task.assignedTo?.username || 'Unassigned'}</span>
                        </div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                    </td>
                    <td className="p-4 text-slate-500">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset capitalize ${getStatusColor(task.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-slate-400'}`}></span>
                            {task.status}
                        </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;