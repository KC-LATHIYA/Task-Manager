import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Loader2, AlertCircle, RefreshCw, Mail, Calendar, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useGetAllUsersQuery } from '../../services/adminAPI';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: apiResponse, isLoading, isError, error, refetch } = useGetAllUsersQuery();

  const users = apiResponse?.data || [];

  const filteredUsers = users.filter((user) => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    return role === 'admin' 
      ? 'bg-purple-100 text-purple-700 border-purple-200' 
      : 'bg-green-100 text-green-700 border-green-200';
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
          <h2 className="text-xl font-bold text-slate-800">Failed to load users</h2>
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
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-800">Team Directory</h1>
           <p className="text-slate-500 mt-1">View all registered members and their roles.</p>
        </div>
        <div className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2">
           <UserIcon className="w-4 h-4" />
           Total Users: <span className="font-bold text-slate-900">{users.length}</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
         <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {filteredUsers.length === 0 ? (
           <div className="p-12 text-center text-slate-500">
              <p>No users found matching "{searchTerm}"</p>
           </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User Profile</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                          {user.username?.charAt(0).toUpperCase()}
                       </div>
                       <div className="font-bold text-slate-800">
                          {user.username}
                       </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {user.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border uppercase ${getRoleBadge(user.role)}`}>
                      {user.role === 'admin' && <ShieldCheck className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-4 h-4 text-slate-400" />
                       {new Date(user.createdAt).toLocaleDateString()}
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

export default ManageUsers;