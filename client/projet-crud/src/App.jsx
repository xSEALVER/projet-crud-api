import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservation from './components/Reservation';
import UpdateReservation from './components/UpdateRservation';
import CreateReservation from './components/CreateReservation';
import SigninComposants from './components/SigninComposants';
import Blankpage from './components/Blankpage';



function App() {

  return (
    
        <Router>
            
                    
            <Routes>

                      {/* <Route path='/' element={<Blankpage />} />
                      <Route path='/signin' element={<SigninComposants />} /> */}
                      <Route path='/' element={<Reservation />} />
                      <Route path='/create' element={<CreateReservation />} />
                      <Route path='/update/:id' element={<UpdateReservation />} />
              
            </Routes>


        </Router>
      
  )
}

export default App
