import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import type { User, Post, Todo } from '../types';

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
};

const fetchAllPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

const fetchAllTodos = async (): Promise<Todo[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return res.json();
};

export const Analytics = () => {
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const { data: posts } = useQuery({ queryKey: ['allPosts'], queryFn: fetchAllPosts });
  const { data: todos } = useQuery({ queryKey: ['allTodos'], queryFn: fetchAllTodos });

  const userStats = users?.map(user => {
    const userPosts = posts?.filter(p => p.userId === user.id) || [];
    const userTodos = todos?.filter(t => t.userId === user.id) || [];
    const completedTodos = userTodos.filter(t => t.completed);

    return {
      id: user.id,
      username: user.username,
      postsCount: userPosts.length,
      todosCount: userTodos.length,
      completedTodosCount: completedTodos.length
    };
  });

  const mostPosts = userStats?.reduce((max, user) => 
    user.postsCount > max.postsCount ? user : max, userStats[0]);
  
  const fewestPosts = userStats?.reduce((min, user) => 
    user.postsCount < min.postsCount ? user : min, userStats[0]);
  
  const mostCompleted = userStats?.reduce((max, user) => 
    user.completedTodosCount > max.completedTodosCount ? user : max, userStats[0]);
  
  const fewestCompleted = userStats?.reduce((min, user) => 
    user.completedTodosCount < min.completedTodosCount ? user : min, userStats[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-blue-500">{users?.length || 0}</p>
          </div>

          <div className="bg-green-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Most Posts</h3>
            <p className="text-lg font-semibold">{mostPosts?.username}</p>
            <p className="text-2xl font-bold text-green-600">{mostPosts?.postsCount} posts</p>
          </div>

          <div className="bg-red-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Fewest Posts</h3>
            <p className="text-lg font-semibold">{fewestPosts?.username}</p>
            <p className="text-2xl font-bold text-red-600">{fewestPosts?.postsCount} posts</p>
          </div>

          <div className="bg-purple-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Most Completed Todos</h3>
            <p className="text-lg font-semibold">{mostCompleted?.username}</p>
            <p className="text-2xl font-bold text-purple-600">{mostCompleted?.completedTodosCount} completed</p>
          </div>

          <div className="bg-orange-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Fewest Completed Todos</h3>
            <p className="text-lg font-semibold">{fewestCompleted?.username}</p>
            <p className="text-2xl font-bold text-orange-600">{fewestCompleted?.completedTodosCount} completed</p>
          </div>

          <div className="bg-indigo-100 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-2">Total Posts</h3>
            <p className="text-4xl font-bold text-indigo-500">{posts?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};