import React, {useState, useReducer, useMemo, useRef, useCallback} from "react";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";
 
const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) =>{
  switch (action.type){
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state
  }
}

const Characters = () =>{

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSeach] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API)


  const handleClick = favorite =>{
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  // const handleSearch = () =>{
  //   setSeach(searchInput.current.value);
  // }

  const handleSearch = useCallback(()=>{
    setSeach(searchInput.current.value);
  }, [])
  // const filteredUsers = characters.filter(user=>{
  //   return user.name.toLowerCase().includes(search.toLowerCase())
  // })

  const filteredUsers = useMemo(()=>
    characters.filter(user=>{
      return user.name.toLowerCase().includes(search.toLowerCase())
    })
  , [characters, search])
  return(
    <div className="Characters">
      {favorites.favorites.map((favorite)=>{
        return <li key={favorite.id}>
          {favorite.name}
        </li>
      })}
      
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>

      {filteredUsers.map(character=>{ 
        return <div  key={character.id}>
          <h2> {character.name} </h2>
          <button type="button" onClick={()=>{handleClick(character)}}>Add to Favorites</button>
        </div>

      })}
    </div>
  );
}

export default Characters;