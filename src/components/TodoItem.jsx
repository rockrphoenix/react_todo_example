import { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleSave = () => {
    onEdit(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={`todo-item ${todo.completed ? 'completed' : ''} editing`}>
        <div className="todo-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Título de la tarea..."
            className="todo-edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Descripción (opcional)..."
            className="todo-edit-textarea"
            rows={2}
          />
        </div>
        <div className="todo-actions">
          <button
            onClick={handleSave}
            className="todo-save"
            disabled={!editTitle.trim()}
          >
            Guardar
          </button>
          <button
            onClick={handleCancel}
            className="todo-cancel"
          >
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-title">{todo.title}</div>
        {todo.description && (
          <div className="todo-description">{todo.description}</div>
        )}
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onToggle(todo.id)}
          className={`todo-toggle ${todo.completed ? 'completed' : 'pending'}`}
        >
          {todo.completed ? 'Marcar Pendiente' : 'Completar Tarea'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="todo-edit"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="todo-delete"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default TodoItem