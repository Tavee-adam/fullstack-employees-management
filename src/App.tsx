import './App.css'

import { Routes, Route } from 'react-router-dom'
import Nav from './layout/Nav'
import Footer from './layout/Footer'
import Body from './layout/Body'
import Create from './pages/create/page'
import List from './pages/list/page'
import Update from './pages/update/page'
import './App.css'
function App() {

  return (
    <main className='root'>
      <Nav />
      <Routes>
        <Route element={<Body />}>
          <Route path='/create' element={<Create />} />
          <Route path='/list' element={<List />} />
          <Route path='/update' element={<Update />} />
        </Route>
      </Routes>
      <Footer />
    </main>
  )
}

export default App
