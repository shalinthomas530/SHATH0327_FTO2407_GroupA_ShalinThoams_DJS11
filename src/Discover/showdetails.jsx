import React, { useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import FavouriteButton from './favouritebutton.jsx'
import { v4 as uuidv4 } from 'uuid';
import { HiArrowLeftCircle } from 'react-icons/hi2';

const ShowDetails = ({menuOpen}) => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [showAll, setShowAll] = React.useState(false);
  const {id} = useParams()    
  const [show, setShow] = React.useState([])   //init state to set show info    
  const [selectedSeason, setSelectedSeason] = React.useState(null);       //add hooks for episodes and seasons
  const [slicedSeasons, setSlicedSeasons] = React.useState([]);
  
 
//----------------fetch data-------------------------------
  React.useEffect(() => {
    async function addShowDetail(){
      setLoading(true)
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)          //fetch  data and set it to set show 
        
        if (!response.ok) {
          throw Error("Data Fetching Failed")
      }
        
        const data = await response.json()
        setShow(data);
        setSelectedSeason(data.seasons[0]);
        setSlicedSeasons(data.seasons.slice(0, 5));   // slice the season to show 

      } catch (err) {
        setError(err)        //set error to err
        
      } finally {
        setLoading(false)
      }
    }
    addShowDetail()  

  }, [id]) // return data

 console.log(show.genres)
 //use effect if data and seasons are available
 
 const handleSeasonSelect = (season) => {
  setSelectedSeason(season === selectedSeason ? null : season);
};


  const handleShowMoreClick = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const visibleSeasons = showAll ? show.seasons : slicedSeasons;     // hide some seasons

  const addToFavorites = (episode) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
 
    const addEpisode = {
      showTitle: show.title,
      seasonUpdated: show.updated,
      seasonTitle: selectedSeason.title,
      episodeTitle: episode.title,
      episodeAudio: episode.file,
      addedDate: new Date().toLocaleString(),
      
    };
  
    const isInFavorites = favorites.some(
      (favEpisode) =>
        favEpisode.showTitle === addEpisode.showTitle &&
        favEpisode.seasonUpdated === addEpisode.seasonUpdated &&
        favEpisode.seasonTitle === addEpisode.seasonTitle &&
        favEpisode.episodeTitle === addEpisode.episodeTitle &&
        favEpisode.episodeAudio === addEpisode.episodeAudio
    );
  
    if (!isInFavorites) {
      favorites.push(addEpisode);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

      
  //-----------------------------------------check for error----------------------------------------------
    if (error) {                 // if error display this message
      return <h1 className='text-red-600 font-extrabold'>{error.message}</h1>
    }
    if (loading){
      return <h1 className='text-white font-extrabold text-3xl justify-center items-center'>Loading ....</h1>
    }

  // check if there is a show is valid then displays or else show....loading..
  // @returns image , title, desciption, eps and seasons
//-------------------filter for seasons-----------------------------------------------
 
  
  
  return (
    <>
      <Link
          to="/"
          relative="path"
          
      ><HiArrowLeftCircle className="bg-[#ff564a] text-5xl rounded-full text-black hover:bg-white "/> <span className='text-white'>Back to all shows</span></Link>
      
      {show.image && (
        <div className=' text-white mt-10 flex sm:flex-wrap gap-8  flex-col  md:items-end'>
          <div  className='flex flex-col md:flex-row gap-3 justify-between'>
            <img className="rounded-md w-48 " src={show.image} alt={show.title} />
            <div className=' rounded-md p-6 bg-black flex flex-col'>
              <h1 className='text-5xl font-extrabold mb-4 md:text7xl'>{show.title}</h1>
              <p>{show.description}</p>
              <p className='text-yellow-400 font-normal'><span>Last updated: </span>{show.updated && typeof show.updated === 'string' ? show.updated.slice(0, 10) : 'N/A'}</p><span>Genres: {show.genres.join(', ')}</span>
            </div>
          </div>
          
     
          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <div className='mb-4 md:mb-0'>
              <h3 className='text-3xl font-extrabold mb-4  md:text5xl '>Seasons</h3>
              <ul className='mb-6 '>
                { visibleSeasons && visibleSeasons.map((season) => (
                  <li
                    key={season.season}
                    
                    onClick={() => handleSeasonSelect(season)}
                  >  
                      <div className='flex flex-row cursor-pointer mb-2 px-2 py-1 rounded transition-colors hover:bg-orange-400 hover:text-black focus:text-black focus:bg-orange-200'>
                        <img
                            src={season.image} // Placeholder image URL
                            alt={show.image}
                            width={50}
                            height={20}
                            className='mr-2'
                          />
                        {season.title} ({season.episodes.length}{" "}
                        episodes)
                      </div> 
                  </li>
                ))}
                <li className='cursor-pointer text-blue-500' onClick={handleShowMoreClick}>
                  {showAll ? 'Hide' : 'Show More'}
                </li>
              </ul>
            </div>
            <ul className='ml-8 md:pl-8'> 
              {selectedSeason && (
                    <>
                      {selectedSeason.episodes.map((episode) => (
                        <li key={episode.title} className='flex justify-between items-center border-b border-gray-300 py-4'>
                          <div >
                            <p className=' font-bold text-yellow-300 text-xl'>{episode.title}</p>
                            <p className='  font-normal line-clamp-2 flex-grow pr-10'>{episode.description}</p>
                          </div>
                         
                          <div className='flex  gap-3'>
                            
                            <audio controls>
                              <source src={episode.file} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                            <FavouriteButton
                              key= {uuidv4()}
                              id= {uuidv4()} 
                              addToFavorites= {()=> addToFavorites(episode)}  
                            />
                          </div>
                          
                        </li>
                      ))}
                    </>
                  )}
             </ul>
          </div>
        </div>   
        
      )}
    
    </>
  )
}

export default ShowDetails