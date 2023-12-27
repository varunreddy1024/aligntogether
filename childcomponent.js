// TodoList.js - Child Component
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const TodoList = ({ todos, onDelete, onEdit, onComplete, onDragEnd }) => {
  return (
    <div className='todo-main'>

    
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: todo.color,
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }} className='todo-list'
                  >
                    <span>{todo.text}</span>
                    <button onClick={() => onDelete(todo.id)} className='main-button'>Delete</button>
                    <button
                      onClick={() => {
                        const newText = prompt('Enter new text:', todo.text);
                        if (newText !== null) onEdit(todo.id, newText);
                      }} className='main-button'
                    >
                      Edit
                    </button>
                    <button onClick={() => onComplete(todo.id)} className='main-button'>
                      {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>

    </div>
  );
};

export default TodoList;