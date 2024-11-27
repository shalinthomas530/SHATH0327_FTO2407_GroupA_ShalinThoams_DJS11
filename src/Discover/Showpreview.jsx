import React from 'react'
import { Link } from 'react-router-dom';
import Filters from '../layout-components/Filters.jsx';
import Searchbar from '../layout-components/Searchbar.jsx';
import Fuse from "fuse.js"

function ShowPreviews() {
  const [previews, setPreviews] = React.useState([]) // initialise state for  podcast preview
  const [error, setError] = React.useState(null) //  initialise state for  error messages
  const [loading, setLoading] = React.useState(false)
  const [previewsLastState, setPreviewsLastState] = React.useState();


  // const [query, setQuery] = React.useState(null)

  const genres = [
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];



  
  
  React.useEffect(()=>{    //set use effect hook for handling api calls
    async function addPreviews(){
      setLoading(true)
      try {
        const response = await fetch('https://podcast-api.netlify.app')          //fetch  data and set it to set preview
        
        if (!response.ok) {
          throw Error("Data Fetching Failed")
      }
        
        const data = await response.json()
        setPreviews(data)
        
          

      } catch (err) {
        setError(err)        //set error to err
        
      } finally {
        setLoading(false)
      }
    }
    addPreviews()  // call function
   }, [])


   React.useEffect(() => {
    // Set previewState to previewData when it changes
    setPreviewsLastState(previews);
  }, [previews]);


  const handleFilter = (event) => {
    const value = event.target.innerText;
    let sortedData;
  
    switch (value) {
      case "A-Z":
        sortedData = [...previewsLastState].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        
        break;
      case "Z-A":
        sortedData = [...previewsLastState].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "Newest":
        sortedData = [...previewsLastState].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        break;
      case "Oldest":
        sortedData = [...previewsLastState].sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
        break;
      default:
        sortedData = [...previewsLastState];
    }
  
    setPreviewsLastState(sortedData);
  };

   let matchSameGenreShows;

   const handleGenreUpdate = (genre) => {
     /*
   Check if the "previewState" array holds any of the given inputs and if so, save
   those genre to thier respective variables. */
     if (genre && genre !== "All") {
       matchSameGenreShows = [...previewsLastState].filter((show) =>
         show.genres.includes(genres.indexOf(genre) + 1)
       );
     } else {
       matchSameGenreShows = [...previewsLastState];
     }
   
     setPreviews(matchSameGenreShows);
   };
 

  
  if (error) {                 // if error display this message
    return <h1 className='text-red-600 font-extrabold'>{error.message}</h1>
  }
  if (loading){
    return <h1 className='text-white font-extrabold text-3xl justify-center items-center'>Loading ....</h1>
  }
  
  

  return (
    <> 
       <h1 className='font-extrabold  text-white text-5xl mb-10 md:text-7xl items-center ml-10'>Welcome to <span className='text-[#ff564a]'>GenZ podcast</span></h1>
       <Filters handleGenreUpdate = {handleGenreUpdate}
       genres = {genres}
       handleFilter={handleFilter}/>
       <ul className='list-none flex flex-wrap ml-8 text-white gap-10  justify-start'>
        {previews.map(preview => (
          <Link key={preview.id} to={`/show/${preview.id}`}>
            <li  className='relative no-underline bg-black max-w-[220px] h-[360px]
            flex flex-col justify-start items-center p-4  rounded-md shadow-[0 0 16px 0 rgba(0, 0, 0, 0.1)]
            hover:cursor-pointer hover:translate-y-[-8px] hover:transition-all hover:shadow-[0 0 18px 0 rgba(0, 0, 0, 0.3)] 
            brightness-125 overflow-hidden'>
              
                <div>
                  <img 
                  src={preview.image} 
                  width={174}
                  height={174}
                  alt={preview.title}
                  className='aspect-square h-fit w-full px-0 rounded-xl 2xl:size-[200px]'/>
                </div>
                
                <div className='flex items-end font-normal pt-4 px-0 pb-0 w-full'>
                  <div className='flex w-full flex-col justify-start gap-1'>
                    <p className='truncate font-bold'>{preview.title}</p>
                    <p className=' text-gray-500 font-normal line-clamp-2 text-ellipsis'>{preview.description}</p>
                    <div className='flex justify-between'>
                      <p><span className='font-bold'>Seasons: </span>{preview.seasons}</p>
                      <p><span className='font-bold'>Genres: </span>{preview.genres.length}</p>
                    </div>
                    <p className=' text-gray-500 font-normal'><span>Last Updated:</span>{preview.updated.slice(0,10)}</p>
                  </div>
                  
                </div>

            </li>

          </Link>
         
        ))}
      </ul>

    </>
  )
}

export default ShowPreviews;