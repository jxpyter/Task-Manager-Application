import React, { useState } from 'react';
import { ListTodo } from 'lucide-react';
import { Task, Category } from './types';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { CategoryFilter } from './components/CategoryFilter';

const initialCategories: Category[] = [
  { id: 'work', name: 'Work', color: '#3B82F6' },
  { id: 'personal', name: 'Personal', color: '#10B981' },
  { id: 'shopping', name: 'Shopping', color: '#F59E0B' },
  { id: 'health', name: 'Health', color: '#EF4444' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddTask = (newTask: {
    title: string;
    description: string;
    category: string;
    dueDate?: Date;
  }) => {
    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date(),
        ...newTask,
      },
      ...prev,
    ]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) =>
    selectedCategory === 'all' ? true : task.category === selectedCategory
  );

  const getCategoryColor = (categoryId: string) =>
    initialCategories.find((cat) => cat.id === categoryId)?.color || '#94A3B8';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <TaskForm categories={initialCategories} onSubmit={handleAddTask} />
        
        <CategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="space-y-1">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              categoryColor={getCategoryColor(task.category)}
            />
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found. Add some tasks to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;