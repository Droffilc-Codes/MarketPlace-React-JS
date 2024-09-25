import React, { useEffect, useReducer } from 'react'
import { getAll } from '../../Services/groceryServices'
import Thumbnails from '../../Components/Thumbnails/Thumbnails'

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

  // console.log(state)
  useEffect(()=>{

    getAll().then(groceryStuffs => dispatch({type: 'GROCERIES LOADED', payload: groceryStuffs }))

  }, [])

  return   <div> 
    
    <Thumbnails groceries={groceries} />
  
  </div>
  
}
