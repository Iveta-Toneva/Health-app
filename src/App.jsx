import { Route, Routes } from 'react-router'
import './App.css'
import ResponsiveAppBar from './components/Navigation/Navigation'
import CalorieCalculator from './components/CalorieCalculator/CalorieCalculator'

function App() {


  return (

    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/calorieCalculator' element={<CalorieCalculator />} />
      </Routes>
    </>

  )
}

export default App
