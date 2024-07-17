import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    
        <Router>
            
                    
            <Routes>

                <Route path='/' element={<Home />} />
              
            </Routes>


        </Router>
      
  )
}

export default App
