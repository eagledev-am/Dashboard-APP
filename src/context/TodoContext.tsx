import { createContext, useContext, useState, type ReactNode } from 'react';

interface TodoContextType {
  completedTodos: Set<number>;
  toggleTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [completedTodos, setCompletedTodos] = useState<Set<number>>(new Set());

  const toggleTodo = (id: number) => {
    setCompletedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <TodoContext.Provider value={{ completedTodos, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
};