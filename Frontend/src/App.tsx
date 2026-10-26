import React from 'react'
import Login from './App/Login'
import Splach from './App/Splach'
<App></App>
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashbord from './App/Dashbord'
import Patient from './App/Patient'
import Rendez_vous from './App/Rendez_vous'
import Suivi from './App/Suivi'
import Consultation from './App/Consultation'
import Plan from './App/Plan'
import Messages from './App/Messages'
import Rapports from './App/Rapports'
import Parametres from './App/Parametres'
import Suivi_detaille from './Componant/Ges_suivi/Suivi_detaille'

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Splach/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Dashbord' element={<Dashbord/>}/>
      <Route path='/Patient' element={<Patient/>}/>
      <Route path='/appointments' element={<Rendez_vous/>}/>
      <Route path='/monitoring' element={<Suivi/>}/>
      <Route path='/consultations' element={<Consultation/>}/>
      <Route path='/meal-plan' element={<Plan/>}/>
      <Route path='/messages' element={<Messages/>}/>
      <Route path='/reports' element={<Rapports/>}/>
      <Route path='/settings' element={<Parametres/>}/>
      <Route path='/Suivi_detaille' element={<Suivi_detaille/>}/>
      
    </Routes>
    </BrowserRouter>
    
   
  );
  {React}
}

export default App
