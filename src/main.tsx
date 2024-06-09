import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Create from './pages/employee/create/page.tsx'
import List from './pages/employee/list/page.tsx'
import Update from './pages/employee/update/page.tsx'
import { Provider } from "react-redux";
import { store } from "./contexts/store.ts"
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
      <Route index path="/list/:id" element={<List />} />
      <Route path='*' element={<h2>NO PAGE</h2>}></Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
