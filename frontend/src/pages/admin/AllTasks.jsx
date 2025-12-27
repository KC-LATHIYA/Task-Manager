import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Edit2, Trash2, Search, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useGetAllTaskQuery, useDeleteTaskMutation } from '../../services/adminAPI';

const AllTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const { data: apiResponse, isLoading, isError, error, refetch } = useGetAllTaskQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const tasksList = apiResponse?.data || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id).unwrap();
      } catch (err) {
        console.error("Failed to delete task:", err);
        alert("Failed to delete task");
      }
    }
  };

  const filteredTasks = tasksList.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo?.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All Status' ||
      task.status === statusFilter.toLowerCase().replace(' ', '-');

    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'high': return 'bg-red-50 text-red-600 border-red-100';
      case 'medium': return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusColor = (s) => {
    switch (s) {
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
          <h2 className="text-xl font-bold text-slate-800">Failed to load tasks</h2>
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">All Tasks</h1>
          <p className="text-slate-500 mt-1">Manage and track all team assignments.</p>
        </div>
        <Link to="/admin/create-task" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all">
          + Create New Task
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title or user..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
            <select
              className="pl-10 pr-8 py-2 border border-slate-200 rounded-lg text-slate-600 focus:outline-none bg-white appearance-none cursor-pointer hover:border-blue-300 transition-colors"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>No tasks found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Task Details</th>
                  <th className="px-6 py-4 font-semibold">Assigned To</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Priority</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 line-clamp-1 max-w-xs" title={task.title}>{task.title}</div>
                      <div className="text-xs text-slate-400 font-mono mt-1">ID: {task._id.slice(-6)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                          {task.assignedTo?.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{task.assignedTo?.username || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusColor(task.status)} capitalize`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border uppercase ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link to={`/admin/update-task/${task._id}`} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(task._id)}
                          disabled={isDeleting}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default AllTasks;