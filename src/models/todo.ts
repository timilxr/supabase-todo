export type Todo = {
  id: string
  name: string
  description: string
  isEditing: boolean
}

export type TodoDraft = {
  name: string
  description: string
}