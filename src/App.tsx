import { useState } from 'react'
import './App.css'
import type { Todo, TodoDraft } from './models/todo';
import { supabase } from './infrastructure/supabase-client';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';


function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = async (draft: TodoDraft) => {
    if (!draft.name.trim()) return
    if (!draft.description.trim()) return

    const newTodo: Partial<Todo> = {
      name: draft.name.trim(),
      description: draft.description.trim()
    }

    const { data, error } = await supabase.from('todos').insert(newTodo).select().single();
    if (error) {
      console.error('Error adding todo:', error.message);
      return;
    }
    console.log('Todo added:', data);
    setTodos((current) => [data, ...current])
  }

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const saveTodo = (id: string, name: string, description: string) => {
    if (!name.trim()) return

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              name: name.trim(),
              description: description.trim(),
              isEditing: false,
            }
          : todo,
      ),
    )
  }

  return (
    <main className="app-shell">
      <section className="todo-panel">
        <h1>Todo List</h1>

        <TodoForm addTodo={addTodo} />

        <section className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-state">No todos yet. Add one above.</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
                onSave={saveTodo}
              />
            ))
          )}
        </section>
      </section>
    </main>
  )
}

export default App
