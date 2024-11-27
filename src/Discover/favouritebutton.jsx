import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import React from 'react'

const FavouriteButton = (props) => {
  
    const [isFavorite, setIsFavorite] = React.useState(false)
    
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        props.addToFavorites();
      };


  return (
    <button id={props.id}  onClick={toggleFavorite}>
    {isFavorite ? <HiHeart className=' text-red-700 font-bold text-4xl' /> : <HiOutlineHeart className='font-bold text-4xl'/>}
  </button>
  )
}

export default FavouriteButton