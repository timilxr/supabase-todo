import { useEffect, useState } from "react";
import type { Todo } from "../models/todo";

export type TodoItemProps = {
  readonly todo: Todo
  readonly onDelete: () => void
  readonly onEdit: () => void
  readonly onCancel: () => void
  readonly onSave: (id: string, name: string, description: string) => void
}
function TodoItem({ todo, onDelete, onEdit, onCancel, onSave }: TodoItemProps) {
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)

  useEffect(() => {
    setName(todo.name)
    setDescription(todo.description)
  }, [todo.name, todo.description, todo.isEditing])

  return (
    <article className="todo-item">
      {todo.isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Edit todo name"
          />
          <textarea
            value={description}
            rows={2}
            onChange={(event) => setDescription(event.target.value)}
            aria-label="Edit todo description"
          />
          <div className="item-actions">
            <button type="button" className="save-button" onClick={() => onSave(todo.id, name, description)}>
              Save
            </button>
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
          <div className="todo-content">
            <div>
              <h2>{todo.name}</h2>
              <p>{todo.description || 'No description provided.'}</p>
            </div>
            <div className="item-actions">
              <button type="button" className="edit-button" onClick={onEdit}>
                Edit
              </button>
              <button type="button" className="delete-button" onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
      )}
    </article>
  )
}

export default TodoItem;