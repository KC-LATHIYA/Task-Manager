import React, { useState } from 'react';
import UserLayout from './UserLayout';
import { Calendar, Loader2, AlertCircle, RefreshCw, LayoutList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetMyTaskQuery } from '../../services/employeAPI';

const TaskCardItem = ({ task }) => {
   const { priority, status, title, dueDate, description, _id } = task;

   const priorityColors = {
      high: "text-red-600 bg-red-50 border-red-100",
      medium: "text-orange-600 bg-orange-50 border-orange-100",
      low: "text-green-600 bg-green-50 border-green-100",
      default: "text-slate-600 bg-slate-50 border-slate-100"
   };

   const statusStyles = {
      'pending': 'bg-slate-100 text-slate-600 border-slate-200',
      'in-progress': 'bg-blue-50 text-blue-700 border-blue-100',
      'completed': 'bg-green-50 text-green-700 border-green-100 opacity-75'
   };

   return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
         <div className="flex justify-between items-start mb-4">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border ${priorityColors[priority] || priorityColors.default}`}>
               {priority} Priority
            </span>
         </div>

         <h3 className={`text-lg font-bold text-slate-800 mb-2 leading-tight line-clamp-1 ${status === 'completed' ? 'text-slate-400 line-through' : ''}`}>
            {title}
         </h3>

         <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">
            {description}
         </p>

         <div className="border-t border-slate-50 pt-4 mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
               <Calendar className="w-3.5 h-3.5" />
               {dueDate ? new Date(dueDate).toLocaleDateString() : 'No Date'}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${statusStyles[status] || statusStyles.pending}`}>
               {status?.replace('-', ' ')}
            </span>
         </div>

         <Link to={`/task/${_id}`} className="mt-5 block w-full py-2.5 rounded-xl border border-slate-200 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all">
            View Details
         </Link>
      </div>
   );
};

const MyTasks = () => {
   const [filter, setFilter] = useState('all');

   const { data: apiResponse, isLoading, isError, error, refetch } = useGetMyTaskQuery();
   const tasks = apiResponse?.data || [];

   const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      return task.status === filter;
   });

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
               <h2 className="text-xl font-bold text-slate-800">Failed to load tasks</h2>
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
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
               <p className="text-slate-500 mt-1">Manage your assigned workload effectively.</p>
            </div>

            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto max-w-full">
               {['all', 'pending', 'in-progress', 'completed'].map(f => (
                  <button
                     key={f}
                     onClick={() => setFilter(f)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap ${filter === f
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                        }`}
                  >
                     {f.replace('-', ' ')}
                  </button>
               ))}
            </div>
         </div>

         {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
               <LayoutList className="w-10 h-10 text-slate-300 mb-2" />
               <p className="text-slate-500 font-medium">No tasks found in this category.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {filteredTasks.map((task) => (
                  <TaskCardItem key={task._id} task={task} />
               ))}
            </div>
         )}
      </UserLayout>
   );
};

export default MyTasks;