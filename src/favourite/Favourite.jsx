import React from 'react';
import FavSortFilters from './FavSortFilters.';
import { HiArrowLeftCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [filteredFavorites, setFilteredFavorites] = React.useState([]);

  React.useEffect(() => {
    // Load favorites from local storage when the component mounts
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFilteredFavorites(favorites);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleDeleteEpisode = (index) => {
    const newFavorites = [...filteredFavorites];
    newFavorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFilteredFavorites(newFavorites);
  };
   
  const handleFavePageFilter = (event) => {
    const filterType = event.target.innerText;
  
    switch (filterType) {
      case 'All':
        setFilteredFavorites(filteredFavorites);
        break;
      case 'A-Z':
        setFilteredFavorites([...filteredFavorites].sort((a, b) => a.showTitle.localeCompare(b.showTitle)));
        break;
      case 'Z-A':
        setFilteredFavorites([...filteredFavorites].sort((a, b) => b.showTitle.localeCompare(a.showTitle)));
        break;
      case 'Newest':
        setFilteredFavorites([...filteredFavorites].sort((a, b) => new Date(b.seasonUpdated) - new Date(a.seasonUpdated)));
        break;
      case 'Oldest':
        setFilteredFavorites([...filteredFavorites].sort((a, b) => new Date(a.seasonUpdated) - new Date(b.seasonUpdated)));
        break;
      default:
        setFilteredFavorites(filteredFavorites);
    }
  };
  

  const groupEpisodesByShow = (favorites) => {
    const grouped = {};
    favorites.forEach((favEpisode, index) => {
      if (!grouped[favEpisode.showTitle]) {
        grouped[favEpisode.showTitle] = { showTitle: favEpisode.showTitle, episodes: [] };
      }
      grouped[favEpisode.showTitle].episodes.push({ ...favEpisode, index });
    });
    return Object.values(grouped);
  };
  

  //call the function groupEpisodebbShow
  const groupedFavoritesEpisode = groupEpisodesByShow(filteredFavorites);

  return (
    <>
        

      <div className='text-white'>
        <Link
            to="/"
            relative="path"
            
        ><HiArrowLeftCircle className="bg-[#ff564a] text-5xl rounded-full text-black hover:bg-white "/> <span className='text-white'>Back to all shows</span>
        </Link>
        <h2 className='text-3xl text-white mt-4 font-extrabold mb-4 md:text-5xl'>Favourites episodes</h2>
        <FavSortFilters  handleFavePageFilter= {handleFavePageFilter}/>
        <ul className='space-y-4 mt-8'>
          {groupedFavoritesEpisode.map((group, groupIndex) => (
            <li key={groupIndex} className='flex flex-col '>
               <h3 className='text-xl font-bold text-orange-300'>{group.showTitle}</h3>
               <h4 className=''>{group.seasonUpdated}</h4>
               <ul className='space-y-2'>
                {group.episodes.map((favEpisode, index) => (
                  <li key={index} className='flex items-center' >
                    {/* Render information about the favorite episode */}
                    <span>{favEpisode.episodeTitle}</span>
                    <span className='text-gray-400 ml-2 mr-3'>(Added: {favEpisode.addedDate})</span>
                    <audio className='ml-auto' controls>
                      <source src={favEpisode.episodeAudio} type='audio/mp3' />
                      Your browser does not support the audio element.
                    </audio>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-8 rounded'
                        onClick={() => handleDeleteEpisode(favEpisode.originalIndex)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>  
              
            </li>
          ))}
        </ul>
      </div>
    </>
   
  );
};

export default Favourites;