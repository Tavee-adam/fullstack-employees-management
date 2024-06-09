import './App.css'
import { useEffect } from 'react'
import { Routes, Route, redirect } from 'react-router-dom'
import Nav from './layout/Nav'
import Footer from './layout/Footer'
import Body from './layout/Body'
import MyDrawer from './layout/Drawer'
import Create from './pages/employee/create/page'
import List from './pages/employee/list/page'
import Update from './pages/employee/update/page'
function App() {
  useEffect(() => {
    redirect("/list")
  }, [])
  return (
    <main className='root'>
      <Nav />
      <Routes>
        <Route element={<Body />}>
          <Route path='/' element={<List />} />
          <Route path='/list' element={<List />} />
          <Route path='/create' element={<Create />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='*' element={<h2>NO PAGE</h2>}></Route>
        </Route>
      </Routes>
      <MyDrawer />
      <Footer />
    </main>
  )
}

export default App
