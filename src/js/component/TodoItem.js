import React from 'react';

const TodoItem = ({ task, onDelete }) => {
  return (
    <li>
      {task.label}
      <button onClick={onDelete}>Eliminar</button>
    </li>
  );
};

export default TodoItem;

