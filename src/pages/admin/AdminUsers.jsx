// import { useState, useEffect } from 'react';
// import { Users, Search, Mail, Phone, Calendar, Loader2 } from 'lucide-react';
// import { authApi } from '../../api/authApi';

// export function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await authApi.getAllUsers();
//         setUsers(data);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredUsers = users.filter((user) => {
//     const name = user.name ? user.name.toLowerCase() : '';
//     const email = user.email ? user.email.toLowerCase() : '';
//     const search = searchTerm ? searchTerm.toLowerCase() : '';
//     return name.includes(search) || email.includes(search);
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
//         <p className="text-gray-500">View and manage registered customers</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
//               <Users className="h-6 w-6 text-indigo-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">{users.length}</p>
//               <p className="text-sm text-gray-500">Total Customers</p>
//             </div>
//           </div>
//         </div>

//         {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//           <div className="flex items-center gap-4">
//             <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
//               <Calendar className="h-6 w-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-gray-900">
//                 {
//                   users.filter((u) => {
//                     const created = new Date(u.createdAt);
//                     const now = new Date();
//                     return (
//                       now.getTime() - created.getTime() <
//                       30 * 24 * 60 * 60 * 1000
//                     );
//                   }).length
//                 }
//               </p>
//               <p className="text-sm text-gray-500">New This Month</p>
//             </div>
//           </div>
//         </div> */}
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search users..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//           />
//         </div>
//       </div>

//       {/* Users Table */}
//       {filteredUsers.length === 0 ? (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//           <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//             No users found
//           </h3>
//           <p className="text-gray-500">
//             Try adjusting your search criteria
//           </p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Username
//                   </th>
//                   {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Email
//                   </th> */}
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Phone
//                   </th>
//                   {/* <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Joined
//                   </th> */}
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Role
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filteredUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
//                           <span className="text-sm font-bold text-white">
//                             {user.name ? user.name.charAt(0).toUpperCase() : '?'}
//                           </span>
//                         </div>
//                         <p className="font-medium text-gray-900">
//                           {user.name || 'N/A'}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <p className="text-gray-900">{user.username || 'N/A'}</p>
//                     </td>
//                     {/* <td className="px-6 py-4">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Mail className="h-4 w-4 text-gray-400" />
//                         {user.email || 'N/A'}
//                       </div>
//                     </td> */}
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Phone className="h-4 w-4 text-gray-400" />
//                         {user.phoneNo || user.phone || 'Not provided'}
//                       </div>
//                     </td>
//                     {/* <td className="px-6 py-4">
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Calendar className="h-4 w-4 text-gray-400" />
//                         {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                       </div>
//                     </td> */}
//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
//                         {user.role}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  Phone,
  Calendar,
  Shield,
  Loader2,
} from "lucide-react";
import { authApi } from "../../api/authApi";
import { cn } from "../../utils/cn";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authApi.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= FILTERING ================= */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const name = user.name?.toLowerCase() || "";
      const username = user.username?.toLowerCase() || "";
      const email = user.email?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        name.includes(search) ||
        username.includes(search) ||
        email.includes(search);

      const matchesRole =
        selectedRole === "ALL" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  /* ================= KPI STATS ================= */

  const totalUsers = users.length;

  const adminCount = users.filter(
    (u) => u.role === "ADMIN"
  ).length;

  const customerCount = users.filter(
    (u) => u.role === "USER"
  ).length;

  const newThisMonth = users.filter((u) => {
    if (!u.createdAt) return false;
    const created = new Date(u.createdAt);
    const now = new Date();
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-[#1A73E8]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A73E8] to-[#34A853] rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          User Management
        </h1>
        <p className="opacity-90">
          Monitor and manage platform users
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Total Users",
            value: totalUsers,
            icon: Users,
          },
          {
            name: "Admins",
            value: adminCount,
            icon: Shield,
          },
          {
            name: "Customers",
            value: customerCount,
            icon: Users,
          },
          {
            name: "New This Month",
            value: newThisMonth,
            icon: Calendar,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <stat.icon className="h-7 w-7 text-[#1A73E8] mb-3" />
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500">
              {stat.name}
            </p>
          </div>
        ))}
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, username or email..."
            className="w-full border rounded-lg pl-9 pr-4 py-2 focus:ring-2 focus:ring-[#1A73E8] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1A73E8] outline-none"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">Customer</option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Registered Users
            </h2>
            <p className="text-sm text-gray-500">
              {filteredUsers.length} results
            </p>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">
              No users found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting filters or search terms.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Username</th>
                  <th className="px-6 py-4 text-left">Phone</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-left">Role</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#1A73E8] flex items-center justify-center text-white text-xs font-bold">
                          {user.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-gray-900">
                          {user.name || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="px-6 py-4 text-gray-800">
                      {user.username || "N/A"}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {user.phoneNo || user.phone || "Not provided"}
                      </div>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4 text-gray-500">
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-3 py-1 text-xs font-semibold rounded-full",
                          user.role === "ADMIN" &&
                            "bg-purple-100 text-purple-700",
                          user.role === "USER" &&
                            "bg-indigo-100 text-indigo-700"
                        )}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
}
