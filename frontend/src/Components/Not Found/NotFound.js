import React from 'react'
import classes from './NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound({message = "Nothing Found", linkRoute = "/", linkText ="Go back to Home"}) {
  return   <div className={classes.container}> 
        {message}
        <Link to={linkRoute}>{linkText}</Link>
   </div>
  
}
