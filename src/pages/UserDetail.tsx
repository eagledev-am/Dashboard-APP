import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import type { User, Post, Todo } from '../types';
import { useTodoContext } from '../context/TodoContext';

const fetchUser = async (id: string): Promise<User> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
};

const fetchPosts = async (userId: string): Promise<Post[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return res.json();
};

const fetchTodos = async (userId: string): Promise<Todo[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  return res.json();
};

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { completedTodos, toggleTodo } = useTodoContext();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id!)
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPosts(id!)
  });

  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodos(id!)
  });

  if (userLoading) return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <Link to="/users" className="text-blue-500 hover:underline">
          ← Back to Users
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
              alt={user?.name}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-gray-600 text-lg">@{user?.username}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Website:</strong> {user?.website}</p>
            </div>
            <div>
              <p><strong>Company:</strong> {user?.company.name}</p>
              <p><strong>City:</strong> {user?.address.city}</p>
              <p><strong>Address:</strong> {user?.address.street}, {user?.address.suite}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Posts ({posts?.length || 0})</h2>
            {postsLoading ? (
              <p>Loading posts...</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posts?.map((post) => (
                  <div key={post.id} className="border-b pb-4">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Todos ({todos?.length || 0})</h2>
            {todosLoading ? (
              <p>Loading todos...</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {todos?.map((todo) => {
                  const isCompleted = completedTodos.has(todo.id) ? !todo.completed : todo.completed;
                  return (
                    <div
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-3 border rounded cursor-pointer hover:bg-gray-50 transition ${
                        isCompleted ? 'bg-green-50 border-green-300' : ''
                      }`}
                    >
                      <p className={`${isCompleted ? 'line-through text-green-700' : 'text-gray-800'}`}>
                        {todo.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};