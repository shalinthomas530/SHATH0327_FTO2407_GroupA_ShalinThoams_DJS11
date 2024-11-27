import React from 'react'
import { HiHome, HiHeart} from 'react-icons/hi'
import { IoClose } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from 'react-router-dom';


const SideBar = ({menuOpen, onToggle}) => {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#ff564a"
    }

  return (
    <div  className={` ${
        menuOpen ? 'w-72' : 'w-20'
      }  text-white  bg-slate-800 h-screen p-5  pt-8 relative duration-300 `}>

        <button onClick={onToggle} className={`absolute cursor-pointer -right-3 top-9 w-7 
                border-2 ${!menuOpen}`}><RxHamburgerMenu/></button>
        <Link to="/">
            <div className="flex gap-x-4 items-center">
                <img className= {`cursor-pointer 'text-[#ff564a] duration-500 ${
                    menuOpen
                  }`} src= '../../public/icon.svg'/>
                <p className={`text-[#ff564a] font-bold text-2xl origin-left  duration-200 ${
              !menuOpen && "scale-0"
            }`}>GenZ<span className='text-white'>cast</span></p>
            </div>
        </Link>   
       
        
        
      
       
        <aside>
            <NavLink 
            to="/"
            style={({ isActive }) => isActive ? activeStyles : null}
            
            >
                <div className=' text-2xl font-bold ml-6 px-[4px] md:px-[16px] flex flex-row justify-start items-center gap-[12px] cursor-pointer w-full hover:text-[#ff564a]'>
                    <HiHome/>
                    <p className= {`origin-left py-8 px-0 duration-200 ${
              !menuOpen && "scale-0"
            }`}>Discover</p>             
                </div>
            </NavLink>
           

            <NavLink 
            to="/Favourites"
            style={({ isActive }) => isActive ? activeStyles : null}
            >
                <div className='text-2xl font-bold ml-6 px-[4px] md:px-[16px] flex flex-row justify-start items-center gap-[12px] cursor-pointer w-full hover:text-[#ff564a]'>
                    <HiHeart/>
                    <p className={`origin-left py-8 px-0 duration-200 ${
              !menuOpen && "scale-0"
            }`}>Favourites</p> 
                </div>
            </NavLink>

        </aside>
      
    </div>
  )
}

export default SideBar