"use client"

import Sidebar from "@/components/sidebar/sidebar";
import { RootState } from "@/reducer/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const authState = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<any[]>([]);

  
  useEffect(() => {
    
    if (!authState.admin) {
      router.push('/login');
      return; 
    }

    
    const fetchUsers = async () => {
      
      const response = await axios.get('localhost:3002/api/controllers/artists/');
      const data = await response.json();
      setUsers(data); 
    };

    fetchUsers();
  }, [authState, router]); 

  
  const handleManageClick = (userId: string) => {
    
    console.log(`Manage user with ID: ${userId}`);
  };

  
  const handleToggleVerified = (userId: string) => {
    
    console.log(`Toggle verified for user with ID: ${userId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Active
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.is_active ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.is_verified ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleManageClick(user.id)}
                >
                  Manage
                </button>
                <button
                  className="ml-4 text-green-600 hover:text-green-800"
                  onClick={() => handleToggleVerified(user.id)}
                >
                  Toggle Verified
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
