import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { logout } = useAuth();

  const cards = [
    {
      title: 'User & Posts Manager',
      description: 'View users, their posts and todos',
      path: '/users',
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Analytics',
      description: 'View statistics from user data',
      path: '/analytics',
      icon: '📊',
      color: 'bg-green-500'
    },
    {
      title: 'Weather Widget',
      description: 'Check weather for any city',
      path: '/weather',
      icon: '🌤️',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
      
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-8">Welcome to Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.path}
              to={card.path}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};