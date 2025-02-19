import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ShowList from './components/Showlist'
import NavBar from './components/Navbar'


function App() {
  

  return (
    <>
      <div>
        <NavBar />
        <ShowList />
      </div>
    </>
  )
}

export default App
