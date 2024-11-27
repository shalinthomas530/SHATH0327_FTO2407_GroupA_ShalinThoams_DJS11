import React from 'react'
 

const Filters = (props) => {
    const [selectedGenre, setSelectedGenre] = React.useState("All");

    const handleGenreChange = (event) => {
      const selectedGenre = event.target.value;
      setSelectedGenre(selectedGenre);
      
      props.handleGenreUpdate(selectedGenre);
    };
    

    return (
      <div className="flex gap-2 mb-10 ml-8 mt-10">

        
        <button className=" text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFilter}>All</button>
        <button className="   text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFilter}>A-Z</button>
        <button className=" text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFilter}>Z-A</button>
        <button className="  text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFilter}>Newest</button>
        <button className="  text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFilter}>Oldest</button>
      
        
        <select className="text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" value={selectedGenre} onChange={handleGenreChange}>
          <option defaultValue style={{ display: 'none' }} value="All">All Genres</option>
          {props.genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    );
}

export default Filters