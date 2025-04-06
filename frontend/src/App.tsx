import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import './App.css'

function App() {
  return (
      <Routes>
        <Route index element={<Layout/>}/>         
      </Routes> 
  )
}

export default App
