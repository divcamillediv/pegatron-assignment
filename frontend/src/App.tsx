// import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
// import axios from 'axios';
import './App.css'

function App() {
  /* const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => setMessage(res.data))
      .catch(err => console.log(err));
  }, []); */

  return (
      <Routes>
        <Route index element={<Layout/>}/>         
      </Routes> 
  )
}

export default App
