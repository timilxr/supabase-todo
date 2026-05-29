import './App.css'
import Auth from './views/Auth';
import TodosManager from './views/TodosManager';


function App() {
return (
  <div className="app">
    <h1>Supabase Todo App</h1>
    <TodosManager />
    <Auth />
  </div>
)
}

export default App
