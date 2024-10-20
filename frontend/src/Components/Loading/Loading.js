import React from 'react'
import { useLoading } from '../../Hook/useLoading'
import classes from  './Loading.module.css'

export default function Loading() {
    const { isLoading } = useLoading()
    if (!isLoading) return
  return (
    <div className={classes.container}>
        <div className={classes.items}>
            <img src='/tube-spinner.svg' alt='Loading_image'/>
            <h1>Loading</h1>
        </div>
    </div>
  )
}
