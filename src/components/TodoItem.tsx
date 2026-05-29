import { useEffect, useState } from "react";
import type { Todo } from "../models/todo";

export type TodoItemProps = {
  readonly todo: Todo
  readonly onDelete: () => void
  readonly onUpdate: (id: string, name: string, description: string) => Promise<void>
}
function TodoItem({ todo, onDelete, onUpdate }: TodoItemProps) {
  const [name, setName] = useState(todo.name)
  const [description, setDescription] = useState(todo.description)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setName(todo.name)
    setDescription(todo.description)
  }, [todo.name, todo.description])

  const onSave = async () => {
    await onUpdate(todo.id, name, description)
    setIsEditing(false)
  }

  return (
    <article className="todo-item">
      {isEditing ? (
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
            <button type="button" className="save-button" onClick={onSave}>
              Save
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
          <div className="todo-content">
            <div>
              <h2>{todo.name}</h2>
              <p>{todo.description}</p>
              <span>{todo.created_at}</span>
            </div>
            <div className="item-actions">
              <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
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