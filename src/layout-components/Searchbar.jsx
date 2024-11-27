import React from 'react'
import { FaSearchengin } from 'react-icons/fa'

const Searchbar = (props) => {
  return (
    <div>
      <input
      type="text"
      className="search__input"
      placeholder="Search"
      onChange={props.handleInput}
    />
    <button className="search__button" onClick={props.handleSearch}>
      <FaSearchengin/>
    </button>
  

    </div>
  )   
}

export default Searchbar