import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Save, ArrowLeft, Trash, Loader2, AlertCircle, RefreshCw, Calendar, User, Clock } from 'lucide-react';
import { 
  useGetTaskByIdQuery, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation, 
  useGetAllUsersQuery 
} from '../../services/adminAPI';

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: taskData, isLoading: isTaskLoading, isError, refetch } = useGetTaskByIdQuery(id);
  const { data: usersData, isLoading: isUsersLoading } = useGetAllUsersQuery();

  const task = taskData?.data;
  const users = usersData?.data || [];

  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  const [errorMsg, setErrorMsg] = useState('');

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTaskDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (task) {
        setFormData({
            title: task.title || '',
            description: task.description || '',
            assignedTo: task.assignedTo?._id || task.assignedTo || '',
            priority: task.priority || 'medium',
            dueDate: formatTaskDate(task.dueDate),
            status: task.status || 'pending'
        });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title || !formData.description || !formData.assignedTo || !formData.dueDate) {
        setErrorMsg("Please fill in all required fields.");
        return;
    }

    if (formData.dueDate < getTodayString()) {
        setErrorMsg("Due date cannot be in the past. Please select a future date.");
        return;
    }

    try {
      await updateTask({ id, data: formData }).unwrap();
      navigate('/admin/all-tasks');
    } catch (err) {
      console.error("Update failed:", err);
      setErrorMsg(err?.data?.message || "Failed to update task.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task? This cannot be undone.")) {
      try {
        await deleteTask(id).unwrap();
        navigate('/admin/all-tasks');
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete task.");
      }
    }
  };

  if (isTaskLoading || isUsersLoading) {
    return (
        <AdminLayout>
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        </AdminLayout>
    );
  }

  if (isError || !task) {
    return (
        <AdminLayout>
            <div className="flex flex-col h-[80vh] items-center justify-center text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-slate-800">Task not found</h2>
                <button onClick={refetch} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Retry
                </button>
            </div>
        </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
           <Link to="/admin/all-tasks" className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600">
              <ArrowLeft className="w-6 h-6" />
           </Link>
           <div>
              <h1 className="text-3xl font-bold text-slate-800">Update Task</h1>
              <p className="text-slate-500 mt-1">Editing Task ID: <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">{id}</span></p>
           </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          
          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Task Title</label>
                 <input 
                    name="title"
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-800"
                    value={formData.title}
                    onChange={handleChange}
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Description</label>
                 <textarea 
                    name="description"
                    rows="5" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                    value={formData.description}
                    onChange={handleChange}
                 ></textarea>
               </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
               <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Current Status</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['pending', 'in-progress', 'completed'].map((status) => (
                    <label key={status} className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.status === status 
                        ? 'border-blue-600 bg-white shadow-md' 
                        : 'border-transparent bg-slate-100 opacity-60 hover:opacity-100'
                    }`}>
                        <input 
                          type="radio" 
                          name="status" 
                          value={status} 
                          checked={formData.status === status}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className={`font-bold capitalize ${formData.status === status ? 'text-blue-600' : 'text-slate-600'}`}>
                           {status.replace('-', ' ')}
                        </span>
                    </label>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Assign To</label>
                 <select 
                    name="assignedTo"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white"
                    value={formData.assignedTo}
                    onChange={handleChange}
                 >
                    <option value="" disabled>Select User</option>
                    {users.map(u => (
                        <option key={u._id} value={u._id}>{u.username} ({u.email})</option>
                    ))}
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Priority</label>
                 <select 
                    name="priority"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white capitalize"
                    value={formData.priority}
                    onChange={handleChange}
                 >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Due Date</label>
                 <input 
                    name="dueDate"
                    type="date"
                    min={getTodayString()}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-white"
                    value={formData.dueDate}
                    onChange={handleChange}
                 />
               </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
               <button 
                 type="button" 
                 onClick={handleDelete}
                 disabled={isDeleting}
                 className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
               >
                  {isDeleting ? <Loader2 className="w-5 h-5 animate-spin"/> : <Trash className="w-5 h-5" />} 
                  Delete Task
               </button>
               
               <button 
                 type="submit" 
                 disabled={isUpdating}
                 className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-50"
               >
                  {isUpdating ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5" />} 
                  Update Changes
               </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateTask;