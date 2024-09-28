import React from 'react'
import classes from './Tags.module.css'
import { Link } from 'react-router-dom'

export default function Tags({tags, groceryPage}) {
  return <div className={classes.container} style={{
    justifyContent: groceryPage? 'start' : 'center'
  }}>
      {
        tags.map(tag => <Link key={tag.name} to={`/tag/${tag.name}`}>{tag.name} {!groceryPage && `(${tag.count})`}</Link>)
      }
    </div>
  
}
