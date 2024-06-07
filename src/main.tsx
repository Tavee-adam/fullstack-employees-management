import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Create from './pages/create/page.tsx'
import List from './pages/list/page.tsx'
import Update from './pages/update/page.tsx'
import {
  createBrowserRouter,
  RouterProvider, createRoutesFromElements,
  Route
} from "react-router-dom";
import './index.css'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path="/create" element={<Create />} />
      <Route path="/update" element={<Update />} />
      <Route index path="/list" element={<List />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
