import { useEffect, useState } from "react";
import { supabase } from "../infrastructure/supabase-client";
import type { Todo, TodoDraft } from "../models/todo";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

const TodosManager = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const {data, error} = await supabase.from('todos').select('*').order('created_at', { ascending: false});

    if(error){
      console.error('Error fetching todos:', error.message);
      return;
    }
    console.log('Fetched todos:', data);
    setTodos(data);
  }

  useEffect(()=>{
    fetchTodos();
  }, [])

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

  const deleteTodo = async (id: string) => {
    const {error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
      console.error('Error deleting todo:', error.message);
      return;
    }
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const updateTodo = async (id: string, name: string, description: string) => {
    if (!id) return
    if (!description) return
    if (!name) return

    const { error } = await supabase.from('todos').update({ name: name.trim(), description: description.trim() }).eq('id', id);
    if (error) {
      console.error('Error updating todo:', error.message);
      return;
    }

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              name: name.trim(),
              description: description.trim()
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
                onUpdate={updateTodo}
              />
            ))
          )}
        </section>
      </section>
    </main>
  )
}

export default TodosManager;