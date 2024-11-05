//Esto deberia servir para renderizar la TodoList

import React from 'react'; //Importo biblio
import TodoList from './component/TodoList'; 

//Defino la función y lo que va a poder renderizar 

function App() {
  return (
    <div className="App">
      <h1>To-do List</h1>
      <TodoList />
    </div>
  );
}

//Se exporta el componente App lo que permite que otros archivos importen App, en este caso eso lo hago en index.js 
export default App;

