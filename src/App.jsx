import { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import './App.css'

const API_URL = 'http://localhost:8000'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`)
      if (response.ok) {
        const data = await response.json()
        // Convert _id to id for frontend compatibility
        const normalizedData = data.map(todo => ({
          ...todo,
          id: todo._id
        }))
        setTodos(normalizedData)
      } else {
        // Fallback data when API is not available
        setTodos([
          { id: 1, title: "Ejemplo de tarea 1", description: "Esta es una descripción de ejemplo", completed: false },
          { id: 2, title: "Ejemplo de tarea 2", description: "Tarea completada con descripción", completed: true },
          { id: 3, title: "Conectar con la API de Python", description: "Configurar endpoints para CRUD completo", completed: false }
        ])
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
      // Fallback data when API is not available
      setTodos([
        { id: 1, title: "Ejemplo de tarea 1", description: "Esta es una descripción de ejemplo", completed: false },
        { id: 2, title: "Ejemplo de tarea 2", description: "Tarea completada con descripción", completed: true },
        { id: 3, title: "Conectar con la API de Python", description: "Configurar endpoints para CRUD completo", completed: false }
      ])
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          completed: false
        }),
      })
      if (response.ok) {
        const newTodo = await response.json()
        // Convert _id to id for frontend compatibility
        const normalizedTodo = { ...newTodo, id: newTodo._id }
        setTodos([...todos, normalizedTodo])
      } else {
        // Local fallback
        const newTodo = {
          id: Math.max(...todos.map(t => t.id || 0), 0) + 1,
          title: taskData.title,
          description: taskData.description,
          completed: false
        }
        setTodos([...todos, newTodo])
      }
    } catch (error) {
      console.error('Error adding todo:', error)
      // Local fallback
      const newTodo = {
        id: Math.max(...todos.map(t => t.id || 0), 0) + 1,
        title: taskData.title,
        description: taskData.description,
        completed: false
      }
      setTodos([...todos, newTodo])
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return
    
    try {
      const response = await fetch(`${API_URL}/tasks/${todo._id || id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      })
      if (response.ok) {
        const updatedTodo = await response.json()
        // Convert _id to id for frontend compatibility
        const normalizedTodo = { ...updatedTodo, id: updatedTodo._id }
        setTodos(todos.map(t => t.id === id ? normalizedTodo : t))
      } else {
        // Local fallback
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
      }
    } catch (error) {
      console.error('Error updating todo:', error)
      // Local fallback
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
    }
  }

  const deleteTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id)
      const response = await fetch(`${API_URL}/tasks/${todo?._id || id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setTodos(todos.filter(t => t.id !== id))
      } else {
        // Local fallback
        setTodos(todos.filter(t => t.id !== id))
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
      // Local fallback
      setTodos(todos.filter(t => t.id !== id))
    }
  }

  const editTodo = async (id, updatedData) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    try {
      const response = await fetch(`${API_URL}/tasks/${todo._id || id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      if (response.ok) {
        const updatedTodo = await response.json()
        // Convert _id to id for frontend compatibility
        const normalizedTodo = { ...updatedTodo, id: updatedTodo._id }
        setTodos(todos.map(t => t.id === id ? normalizedTodo : t))
      } else {
        // Local fallback
        setTodos(todos.map(t => t.id === id ? { ...t, ...updatedData } : t))
      }
    } catch (error) {
      console.error('Error editing todo:', error)
      // Local fallback
      setTodos(todos.map(t => t.id === id ? { ...t, ...updatedData } : t))
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo App</h1>
      </header>
      <main className="app-main">
        <TodoForm onSubmit={addTodo} />
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
    </div>
  )
}

export default App