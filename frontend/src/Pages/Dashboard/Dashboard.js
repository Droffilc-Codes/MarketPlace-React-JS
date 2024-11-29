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
        forAdmin: true,
        bgColor: '#00bfa5',
        color: 'white'
    },
    {
        title: 'Groceries',
        imageUrl: '/icons/shopping.svg',
        url: '/admin/groceries',
        forAdmin: true,
        bgColor: '#e040fb',
        color: 'white'
    },
    
    {
        title: 'Statistics',
        imageUrl: '/icons/stats.svg',
        url: '/admin/stats',
        forAdmin: true,
        bgColor: '#ff9800',
        color: 'white'
    },
    {
        title: 'Shipping',
        imageUrl: '/icons/ship.svg',
        url: '/admin/delivery',
        forAdmin: true,
        bgColor: '#03a9f4',
        color: 'white'
    },
    {
        title: 'Shops',
        imageUrl: '/icons/shops.svg',
        url: '/admin/shops',
        forAdmin: true,
        bgColor: '#4caf50',
        color: 'white'
    },
    {
        title: 'Accounts',
        imageUrl: '/icons/accounts.svg',
        url: '/admin/accounts',
        forAdmin: true,
        bgColor: '#ff5722',
        color: 'white'
    },
    {
        title: 'Payment Approval',
        imageUrl: '/icons/Payment-approval.svg',
        url: '/admin/approve-pay',
        forAdmin: true,
        bgColor: '#9c27b0',
        color: 'white'
    },


    
]