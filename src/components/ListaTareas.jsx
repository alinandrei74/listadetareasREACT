import React, { useState } from 'react';
// Componente principal para lista de tareas, maneja
//la interfaz y la lógica
const ListaTareas = () => {
//Estado para almacenar tareas
//useState es un hook de react que permite añadir estado a componentes funcionales
//cada tarea se guarda en un array

  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Hacer la compra', completada: false },
    { id: 2, texto: 'Estudiar React', completada: false },
    { id: 3, texto: 'Hacer ejercicio', completada: false },
  ]);
//estado para manejar cada nueva tarea
//se actualiza cada vez que el usuario modifica el input
  const [nuevaTarea, setNuevaTarea] = useState('');
//alterna el estado de completada de una tarea
//se llama cuando el usuaio hace click en una tarea
  const toggleCompletada = (id) => {
    //set tareas actualiza el estado de las tareas
    //map para crear un nuevo array para garantizar la inmutabilidad
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };
//función para agregar tarea, se llama cuando se envía el formulario
  const agregarTarea = (e) => {
    e.preventDefault(); //evita la recarga del formulario
    console.log('Intento de agregar tarea:', nuevaTarea); // Log para ver flujo en consola
    if (nuevaTarea.trim()) {
      //trimea los espacios de los lados del string que se añade como tarea
      //el spread crea un array con las tareas existentes
       //date marca la tarea del array con un id único para diferenciarlos
      const nuevasTareas = [...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }];
      console.log('Nuevas tareas:', nuevasTareas); // Log para depuración
      setTareas(nuevasTareas);
      setNuevaTarea('');
    }
  };

  console.log('Estado actual de tareas:', tareas); // Log para depuración

  return (
    //componente randerizador del formulario
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      <form onSubmit={agregarTarea} className="mb-4">
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Agregar Tarea
        </button>
      </form>
      <ul>
        {tareas.map(tarea => (
          <li
            key={tarea.id}
            onClick={() => toggleCompletada(tarea.id)}
            className={`cursor-pointer p-2 mb-2 ${tarea.completada ? 'line-through text-gray-500 bg-gray-100' : 'bg-gray-200'} rounded`}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;

