import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, StickyNote, BarChart3, CloudSun, LayoutDashboard } from 'lucide-react';

export const Dashboard = () => {
  const { logout } = useAuth();

  const cards = [
    {
      title: 'User & Posts Manager',
      description: 'View users, their posts and todos',
      path: '/users',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Note Manager',
      description: 'Create and organize notes by priority',
      path: '/notes',
      icon: StickyNote,
      color: 'bg-orange-500'
    },
    {
      title: 'Analytics',
      description: 'View statistics from user data',
      path: '/analytics',
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      title: 'Weather Widget',
      description: 'Check weather for any city',
      path: '/weather',
      icon: CloudSun,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-7 h-7 text-blue-600" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
      
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-8">Welcome to Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.path}
                to={card.path}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};