import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import type { User } from '../types';

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

export const UsersList = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  if (isLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading users...</div>;
  if (error) return <div className="min-h-screen bg-gray-100 p-8">Error loading users</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </nav>
      
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-center">{user.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};