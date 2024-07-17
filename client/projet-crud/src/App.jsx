import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservation from './components/Reservation';
import UpdateReservation from './components/UpdateRservation';
import CreateReservation from './components/CreateReservation';
import SigninComposants from './components/SigninComposants';



function App() {

  return (
    
        <Router>
            
                    
            <Routes>

                      <Route path='/' element={<SigninComposants />} />
                      <Route path='/reservation' element={<Reservation />} />
                      <Route path='/create' element={<CreateReservation />} />
                      <Route path='/update/:id' element={<UpdateReservation />} />
              
            </Routes>


        </Router>
      
  )
}

export default App
