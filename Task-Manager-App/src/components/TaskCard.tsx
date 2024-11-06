import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  categoryColor: string;
}

export function TaskCard({ task, onToggle, onDelete, categoryColor }: TaskCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 transition-all hover:shadow-md ${
      task.completed ? 'opacity-75' : ''
    }`} style={{ borderLeftColor: categoryColor }}>
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="mt-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}