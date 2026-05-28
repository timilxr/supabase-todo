import { useState } from 'react'
import './App.css'
import type { Todo, TodoDraft } from './models/todo';
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';


function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (draft: TodoDraft) => {
    if (!draft.name.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      name: draft.name.trim(),
      description: draft.description.trim(),
      isEditing: false,
    }

    setTodos((current) => [newTodo, ...current])
  }

  const deleteTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const enableEdit = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo,
      ),
    )
  }

  const cancelEdit = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo,
      ),
    )
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
                onEdit={() => enableEdit(todo.id)}
                onCancel={() => cancelEdit(todo.id)}
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
