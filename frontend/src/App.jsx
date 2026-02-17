import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FacialExpression from './Components/FacialExpression'
import MoodSongs from './Components/MoodSongs';


function App() {

   const [ Songs, setSongs ] = useState([

     ])

   const [ currentMood, setCurrentMood ] = useState('')


  return (
    <>
       <FacialExpression setSongs={setSongs} setCurrentMood={setCurrentMood}/>
       <MoodSongs  Songs={Songs} currentMood={currentMood} />
    </>
  )
}

export default App
