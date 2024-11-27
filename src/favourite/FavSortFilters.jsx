import React from 'react'

const FavSortFilters = (props) => {
  return (
    <div className="flex gap-2">
      <button className=" text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFavePageFilter}>All</button>
      <button className="   text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFavePageFilter}>A-Z</button>
      <button className=" text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFavePageFilter}>Z-A</button>
      <button className="  text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFavePageFilter}>Newest</button>
      <button className="  text-black bg-orange-300 py-2 px-4 hover:bg-orange-400 focus:bg-orange-500 rounded-md" onClick={props.handleFavePageFilter}>Oldest</button>
    </div>
  );
}

export default FavSortFilters