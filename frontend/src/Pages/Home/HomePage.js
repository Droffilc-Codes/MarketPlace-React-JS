import React, { useEffect, useReducer } from 'react'
import { getAll, search } from '../../Services/groceryServices'
import Thumbnails from '../../Components/Thumbnails/Thumbnails'
import { useParams } from 'react-router-dom'
import Search from '../../Components/Search/Search'

const initialState = {
  groceries: []
}

const reducer = (state, action) => {
  switch(action.type){
    case 'GROCERIES LOADED':
      return {
        ...state,
        groceries: action.payload
      }
    default:
      return state
  }
}


export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {groceries} = state
  const {searchTerm} = useParams()

  // console.log(state)
  useEffect(()=>{

    const loadGroceries = searchTerm ? search(searchTerm) : getAll()

    loadGroceries.then(groceryStuffs => dispatch({type: 'GROCERIES LOADED', payload: groceryStuffs }))

  }, [searchTerm])

  return   <div> 
    
    <Search />
    <Thumbnails groceries={groceries} />
  
  </div>
  
}
