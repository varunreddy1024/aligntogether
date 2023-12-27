// TodoForm.js

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoList from './TodoList';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedColor, setSelectedColor] = useState('#000000');

    const addTodo = () => {
        if (inputText.trim() === '') return;

        const newTodo = {
            id: new Date().getTime(),
            text: inputText,
            color: selectedColor,
            completed: false,
        };

        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInputText('');
        console.log(todos);
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const markComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleColorChange = (color) => {
        console.log(color);
        setSelectedColor(color);
    };

    const moveTodo = (fromIndex, toIndex) => {
        const updatedTodos = [...todos];
        const [removedTodo] = updatedTodos.splice(fromIndex, 1);
        updatedTodos.splice(toIndex, 0, removedTodo);
        setTodos(updatedTodos);
    };

    return (
        <div>
            
            <h1>TODO List</h1>
            <DndProvider backend={HTML5Backend}>
                <TodoList
                    todos={todos}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    markComplete={markComplete}
                    moveTodo={moveTodo}
                />
            </DndProvider>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Add a new todo..."
                className='input-form'
            />
            <input
                type="color"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)} className='input-form'
            />
            <button onClick={addTodo} className='main-button'>Add Todo</button>
            
        </div>
    );
};

export default TodoApp;