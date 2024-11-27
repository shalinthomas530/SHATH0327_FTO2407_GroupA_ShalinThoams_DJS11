import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import SideBar from './layout-components/SideBar.jsx'
import Favourites from './Favourites/Favourites.jsx'
import ShowPreviews from './Discover/ShowPreviews.jsx'
import ShowDetails from './Discover/showdetails.jsx'
import ShowsCarousel from './Discover/ShowsCarousel.jsx'


const App = () => {

  const [menuOpen, setMenuOpen] =React.useState(false); 

  const onToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <BrowserRouter>
      <div className=' flex flex-row min-h-screen w-full bg-gray-900 '>
        <SideBar menuOpen = {menuOpen}  onToggle={onToggle}/>   
        <div className='h-screen flex-1 p-7 overflow-x-hidden'> 
        <Routes>
          <Route path='/' exact element={<ShowPreviews/>}/>
          <Route path='/Favourites'  exact element={<Favourites/>}/>
          <Route path='/show/:id'  exact element={<ShowDetails/>}/>

        </Routes>

        </div>
        
      </div>
    </BrowserRouter>
  
    
  )
}

export default App