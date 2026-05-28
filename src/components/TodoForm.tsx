import { useState } from "react";
import type { TodoDraft } from "../models/todo";

export type TodoFormProps = {
  addTodo: (draft: TodoDraft) => void
}

const initialDraft: TodoDraft = {
  name: '',
  description: '',
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [draft, setDraft] = useState<TodoDraft>(initialDraft);

  const handleAddTodo = () => {
    addTodo(draft);
    setDraft(initialDraft);
  }

  return (
    <div className="todo-form">
          <label>
            Name
            <input
              type="text"
              value={draft.name}
              onChange={(event) =>
                setDraft((current) => ({ ...current, name: event.target.value }))
              }
              placeholder="Enter todo name"
            />
          </label>
          <label>
            Description
            <textarea
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Enter todo description"
              rows={3}
            />
          </label>
          <button type="button" className="add-button" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
  )
}

export default TodoForm;