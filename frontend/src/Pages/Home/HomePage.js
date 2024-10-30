import React, { useEffect, useReducer } from 'react'
import { getAll, getAllGroceriesByTag, getAllTags, search } from '../../Services/groceryServices'
import Thumbnails from '../../Components/Thumbnails/Thumbnails'
import { useParams } from 'react-router-dom'
import Search from '../../Components/Search/Search'
import Tags from '../../Components/Tags/Tags'
import NotFound from '../../Components/Not Found/NotFound'
// import { type } from '@testing-library/user-event/dist/type'

const initialState = {
  groceries: [],
  tags: []
}

const reducer = (state, action) => {
  switch(action.type){
    case 'GROCERIES LOADED':
      return {
        ...state,
        groceries: action.payload
      }
      case 'TAGS_LOADED':
        return {
          ...state,
          tags: action.payload
        }
    default:
      return state
  }
}


export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {groceries, tags} = state
  const {searchTerm, tag} = useParams()

  useEffect(()=>{

    getAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload: tags}))
    const loadGroceries = tag? getAllGroceriesByTag(tag) : searchTerm ? search(searchTerm) : getAll()

    loadGroceries.then(groceryStuffs => dispatch({type: 'GROCERIES LOADED', payload: groceryStuffs }))

  }, [searchTerm, tag])

  return   <div> 
    
    <Search />
    <Tags tags={tags} />
    {groceries.length === 0 && <NotFound linkText='Reset Search' />}
    <Thumbnails groceries={groceries} />
  
  </div>
  
}
