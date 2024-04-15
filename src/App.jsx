import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import { Biseccion } from './pages/Biseccion';
import { FalsaPosicion } from './pages/FalsaPosicion';
import { Raphson } from './pages/Raphson';
import { Secante } from './pages/Secante';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/biseccion' element={<Biseccion />} />
        <Route path='/falsaposicion' element={<FalsaPosicion />} />
        <Route path='/raphson' element={<Raphson />} />
        <Route path='/secante' element={<Secante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;