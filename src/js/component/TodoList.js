// src/js/component/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  // Estado para almacenar las tareas y la tarea nueva
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Función para cargar las tareas desde la API
  const loadTasks = async () => {
    try {
      const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/username');
      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Almacena las tareas en el estado
      } else {
        console.log('Error al cargar las tareas');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Crear el usuario si no existe en la API
  const createUser = async () => {
    await fetch('https://assets.breatheco.de/apis/fake/todos/user/username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([]), // El usuario comienza con una lista vacía
    });
  };

  // useEffect para cargar las tareas al iniciar
  useEffect(() => {
    const initialize = async () => {
      try {
        await loadTasks();
      } catch {
        await createUser();
        await loadTasks();
      }
    };
    initialize();
  }, []);

  // Función para agregar una tarea
  const addTask = async () => {
    if (newTask.trim() === '') return; // No permite agregar tareas vacías

    const updatedTasks = [...tasks, { label: newTask, done: false }];
    setTasks(updatedTasks); // Actualiza el estado local
    setNewTask(''); // Limpia el campo de entrada

    // Actualiza las tareas en la API
    await fetch('https://assets.breatheco.de/apis/fake/todos/user/username', {
      method: 'PUT',
      body: JSON.stringify(updatedTasks),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Función para eliminar una tarea
  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filtra la tarea eliminada
    setTasks(updatedTasks); // Actualiza el estado local

    // Actualiza las tareas en la API
    await fetch('https://assets.breatheco.de/apis/fake/todos/user/username', {
      method: 'PUT',
      body: JSON.stringify(updatedTasks),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Renderizado del componente
  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Añadir tarea</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.label}
            <button onClick={() => deleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
