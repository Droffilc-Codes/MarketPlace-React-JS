import React from 'react'
import { useAuth } from '../../Hook/useAuth'
import classes from './dashboard.module.css'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const { user } = useAuth()

  return  <div className={classes.container}>
            <div className={classes.menu}>
            {
                allItems.filter( item => user.isAdmin || !item.forAdmin )
                .map(item => (
                    <Link 
                        key={item.title}
                        to={item.url}
                        style={{
                            backgroundColor: item.bgColor,
                            color: item.color
                        }}
                    >
                    <img src={item.imageUrl} alt={item.title} />
                    <h2>{item.title}</h2>
                    </Link>
                ))
            }
            </div>
    </div>
  
}


const allItems = [
    {
        title: 'Orders',
        imageUrl: '/icons/orders.svg',
        url: '/orders',
        bgColor: '#2ECC71',
        color: 'white'
    },
    {
        title: 'Profile',
        imageUrl: '/icons/profile.svg',
        url: '/user-profile',
        bgColor: '#1565c0',
        color: 'white'
    },
    {
        title: 'Users',
        imageUrl: '/icons/users.svg',
        url: '/admin/users',
        bgColor: '#00bfa5',
        color: 'white'
    },
    {
        title: 'Groceries',
        imageUrl: '/icons/shopping.svg',
        url: '/admin/groceries',
        bgColor: '#e040fb',
        color: 'white'
    },
]