import React, { useState, useEffect } from 'react';
import UserLayout from './UserLayout';
import { ArrowLeft, Calendar, Flag, User, Clock, CheckCircle2, Loader2, AlertCircle, Save } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetMyTaskByIdQuery, useUpdateTaskStatusMutation } from '../../services/employeAPI';

const TaskDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const { data: apiResponse, isLoading, isError, error } = useGetMyTaskByIdQuery(id);
   const task = apiResponse?.data;

   const [updateStatus, { isLoading: isUpdating }] = useUpdateTaskStatusMutation();

   const [status, setStatus] = useState('');

   useEffect(() => {
      if (task) {
         setStatus(task.status);
      }
   }, [task]);

   const handleSaveStatus = async () => {
      if (!status) return;
      try {
         await updateStatus({ id, data: { status } }).unwrap();
         alert("Status updated successfully!");
      } catch (err) {
         console.error("Failed to update status", err);
         alert(err?.data?.message || "Failed to update status");
      }
   };

   const getPriorityBadge = (p) => {
      const styles = {
         high: "bg-red-50 text-red-600 border-red-100",
         medium: "bg-orange-50 text-orange-600 border-orange-100",
         low: "bg-green-50 text-green-600 border-green-100"
      };
      return styles[p] || "bg-slate-50 text-slate-600 border-slate-100";
   };

   if (isLoading) {
      return (
         <UserLayout>
            <div className="flex h-[80vh] items-center justify-center">
               <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
         </UserLayout>
      );
   }

   if (isError || !task) {
      return (
         <UserLayout>
            <div className="flex flex-col h-[80vh] items-center justify-center text-center">
               <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
               <h2 className="text-xl font-bold text-slate-800">Task Not Found</h2>
               <p className="text-slate-500 mb-6">{error?.data?.message || "This task may have been deleted."}</p>
               <Link to="/my-tasks" className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors">
                  Back to My Tasks
               </Link>
            </div>
         </UserLayout>
      );
   }

   return (
      <UserLayout>
         <div className="max-w-5xl mx-auto">
            <Link to="/my-tasks" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to tasks
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

               <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                     <div className="flex gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${getPriorityBadge(task.priority)}`}>
                           <Flag className="w-3 h-3" /> {task.priority} Priority
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-slate-50 text-slate-500 border border-slate-100 text-xs font-mono font-medium">
                           ID: #{task._id.slice(-6)}
                        </span>
                     </div>

                     <h1 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
                        {task.title}
                     </h1>

                     <div className="prose prose-slate max-w-none">
                        <h3 className="text-slate-800 font-bold text-lg mb-2">Description</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                           {task.description}
                        </p>
                     </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                     <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Activity Log</h4>
                     <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                           Sys
                        </div>
                        <div>
                           <p className="text-sm text-slate-700">Task created by <span className="font-bold">{task.createdBy?.username || 'Admin'}</span></p>
                           <p className="text-xs text-slate-400 mt-1">{new Date(task.createdAt).toLocaleString()}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">

                  <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-500/5 border border-slate-100">
                     <h3 className="text-sm font-bold text-slate-800 mb-4">Update Status</h3>
                     <div className="space-y-3">
                        {['pending', 'in-progress', 'completed'].map((s) => (
                           <label key={s} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${status === s
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-transparent hover:bg-slate-50'
                              }`}>
                              <input
                                 type="radio"
                                 name="status"
                                 value={s}
                                 checked={status === s}
                                 onChange={() => setStatus(s)}
                                 className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="capitalize font-bold text-slate-700 text-sm">{s.replace('-', ' ')}</span>
                           </label>
                        ))}
                     </div>
                     <button
                        onClick={handleSaveStatus}
                        disabled={isUpdating}
                        className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                     >
                        {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                     </button>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Task Info</h3>

                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-lg bg-slate-100 text-slate-500"><Calendar className="w-5 h-5" /></div>
                           <div>
                              <p className="text-xs text-slate-400 font-bold uppercase">Due Date</p>
                              <p className="text-sm font-bold text-slate-800">
                                 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-lg bg-slate-100 text-slate-500"><User className="w-5 h-5" /></div>
                           <div>
                              <p className="text-xs text-slate-400 font-bold uppercase">Assigned By</p>
                              <p className="text-sm font-bold text-slate-800">{task.createdBy?.username || 'Admin'}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-lg bg-slate-100 text-slate-500"><Clock className="w-5 h-5" /></div>
                           <div>
                              <p className="text-xs text-slate-400 font-bold uppercase">Created At</p>
                              <p className="text-sm font-bold text-slate-800">{new Date(task.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </UserLayout>
   );
};

export default TaskDetails;