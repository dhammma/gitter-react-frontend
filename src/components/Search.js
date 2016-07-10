import React from 'react'

const Search = ({searchQuery}) => (
    <div className="rooms-search">
        <input
            className="rooms-search-field"
            type="search"
            placeholder="Search"
            autoComplete="off"
            onChange={(event) => searchQuery(event.target.value)}
        />
    </div>
)

export default Search