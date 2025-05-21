
import { useRoutes } from 'react-router-dom'
import './App.css'
import {routes} from './routes'
import NavBar from './Components/NavBar'

function App() {

const element = useRoutes(routes)
  return (
    <>
      <NavBar />
     {element}
    </>
  )
}

export default App
