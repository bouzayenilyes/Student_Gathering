import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';
import { Card } from './ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  onDragEnd: (result: any) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateDueDate: (id: string, date: Date) => void;
}

export function TodoList({ 
  todos, 
  onDragEnd, 
  onToggle, 
  onDelete, 
  onUpdateDueDate 
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card className="p-8 sm:p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl">✨</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No tasks found. Add some tasks to get started!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-3 sm:space-y-4"
          >
            <AnimatePresence>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdateDueDate={onUpdateDueDate}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}