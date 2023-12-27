
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Todo = ({ todo, index, deleteTodo, editTodo, markComplete, moveTodo }) => {
    const [, drag] = useDrag({
        type: 'TODO',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'TODO',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveTodo(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });
    const textColor = todo.color === '#000000' ? '#ffffff' : '#000000';
    return (
        <div ref={(node) => drag(drop(node))} key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignContent: "center", height: 'fit-content', padding: '10px', cursor: "move", color: textColor, backgroundColor: todo.color}} className='main-list'>
            <p style={{ display: 'inline-block', margin: '0px', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </p>
            <div>
                <button style={{ cursor: "pointer" }} onClick={() => editTodo(todo.id, prompt('Edit todo:', todo.text))} className='main-button'>
                    Edit
                </button>
                <button style={{ cursor: "pointer" }} onClick={() => deleteTodo(todo.id)} className='main-button'>Delete</button>
                <button style={{ cursor: "pointer" }} onClick={() => markComplete(todo.id)} className='main-button'>
                    {todo.completed ? 'Unmark Complete' : 'Mark Complete'}
                </button>
            </div>
        </div>
    );
};

const TodoList = ({ todos, deleteTodo, editTodo, markComplete, moveTodo }) => {
    return (
        <div>
            {todos.map((todo, index) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    index={index}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                    markComplete={markComplete}
                    moveTodo={moveTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;