# React Todo Example

A simple React frontend for a todo application that connects to a Python API.

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Clean, responsive UI
- API integration ready

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Python API running on `http://localhost:8000`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Configuration

The app expects a Python API running on `http://localhost:8000` with the following endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx    # Form to add new todos
│   ├── TodoItem.jsx    # Individual todo item
│   └── TodoList.jsx    # List of todos
├── App.jsx            # Main app component
├── App.css           # App styles
├── index.css         # Global styles
└── main.jsx          # React entry point
```