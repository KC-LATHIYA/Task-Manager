import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Save, X, Calendar, User, AlertCircle, Loader2 } from 'lucide-react';
import { useGetAllUsersQuery, useCreateTaskMutation } from '../../services/adminAPI';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const navigate = useNavigate();

  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const users = usersData?.data || [];

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (p) => {
    setFormData({ ...formData, priority: p });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title || !formData.description || !formData.assignedTo || !formData.dueDate) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (formData.dueDate < getTodayString()) {
      setErrorMsg("Due date cannot be in the past. Please select today or a future date.");
      return;
    }

    try {
      await createTask(formData).unwrap();
      navigate('/admin/all-tasks');
    } catch (err) {
      console.error("Failed to create task:", err);
      setErrorMsg(err?.data?.message || "Failed to create task. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Create Task</h1>
            <p className="text-slate-500 mt-1">Assign a new task to your team members.</p>
          </div>
          <button
            onClick={() => navigate('/admin/all-tasks')}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">

          {errorMsg && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm animate-pulse">
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Task Details</h3>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Task Title <span className="text-red-500">*</span></label>
                <input
                  name="title"
                  type="text"
                  placeholder="e.g., Fix Navigation Bug"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                />
                <p className="text-xs text-slate-400 text-right">{formData.title.length}/100</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Provide detailed instructions..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> Assign To <span className="text-red-500">*</span>
                </label>
                <select
                  name="assignedTo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  disabled={isLoadingUsers}
                >
                  <option value="">{isLoadingUsers ? "Loading Users..." : "Select a team member"}</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.username} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  name="dueDate"
                  type="date"
                  min={getTodayString()}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-600"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400" /> Priority
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePriority(p)}
                      className={`flex-1 py-2.5 rounded-xl border font-medium text-sm capitalize transition-all ${formData.priority === p
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Initial Status</label>
                <select
                  name="status"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

            </div>

            <div className="pt-8 flex items-center justify-end gap-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/admin/all-tasks')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                <X className="w-5 h-5" /> Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all 
                   ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isCreating ? (
                  <> <Loader2 className="w-5 h-5 animate-spin" /> Creating... </>
                ) : (
                  <> <Save className="w-5 h-5" /> Create Task </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateTask;