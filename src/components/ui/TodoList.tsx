"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = { id: Date.now(), text: input.trim(), completed: false };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      {isClient && (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <Button onClick={() => deleteTodo(todo.id)} variant="destructive" size="sm">
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;