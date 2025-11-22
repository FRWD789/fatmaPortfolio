import { Routes, Route} from 'react-router'
import {ProjectDetail} from './pages/ProjectDetail'
import Home from './pages/Home'


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    
  )
}

export default App


