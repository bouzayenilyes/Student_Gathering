import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { PomodoroTimer } from './components/pomodoro/PomodoroTimer';
import { TaskStats } from './components/stats/TaskStats';
import { Card } from './components/ui/Card';
import { Confetti } from './components/animations/Confetti';
import { Todo, TodoCategory } from './types/todo';
import { useNotifications } from './hooks/useNotifications';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<TodoCategory>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const { notify, requestPermission } = useNotifications();

  useEffect(() => {
    requestPermission();
    localStorage.setItem('todos', JSON.stringify(todos));
    
    const interval = setInterval(() => {
      todos.forEach(todo => {
        if (todo.dueDate && !todo.completed) {
          const dueDate = new Date(todo.dueDate);
          const now = new Date();
          const diff = dueDate.getTime() - now.getTime();
          
          if (diff > 0 && diff <= 60 * 60 * 1000) {
            notify({
              title: 'Task Due Soon',
              body: `"${todo.title}" is due in 1 hour!`
            });
          } else if (diff <= 0) {
            notify({
              title: 'Task Overdue',
              body: `"${todo.title}" is now overdue!`
            });
          }
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos, notify, requestPermission]);

  const addTodo = (title: string, category: 'work' | 'personal' | 'urgent') => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const completed = !todo.completed;
        if (completed) {
          setShowConfetti(true);
          notify({
            title: 'Task Completed',
            body: `Great job! "${todo.title}" has been completed.`
          });
        }
        return { ...todo, completed };
      }
      return todo;
    }));
  };

  const updateDueDate = (id: string, date: Date) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, dueDate: date.toISOString() } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'all' ? true : todo.category === filter
  );

  return (
    <div className="min-h-screen transition-colors duration-200
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-900
      bg-gradient-to-br from-white via-purple-50 to-indigo-50">
      {showConfetti && <Confetti />}
      <Header todos={todos} />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 sm:pb-12">
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <TaskStats todos={todos} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6">
                <TodoInput onAdd={addTodo} />
                <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
              </Card>
              
              <TodoList
                todos={filteredTodos}
                onDragEnd={onDragEnd}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdateDueDate={updateDueDate}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PomodoroTimer />
              </div>
            </div>
          </div>
        </div>
      </main>
      <PWAInstallPrompt />
    </div>
  );
}

export default App;