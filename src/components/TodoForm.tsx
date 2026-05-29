import { useState } from "react";
import type { TodoDraft } from "../models/todo";

export type TodoFormProps = {
  addTodo: (draft: TodoDraft) => Promise<void>
}

const initialDraft: TodoDraft = {
  name: '',
  description: '',
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [draft, setDraft] = useState<TodoDraft>(initialDraft);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodo(draft);
    setDraft(initialDraft);
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="add-button">
            Add Todo
          </button>
        </form>
  )
}

export default TodoForm;