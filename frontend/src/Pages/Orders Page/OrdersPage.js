import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllOrders, getAllStatus } from '../../Services/orderService'
import classes from './ordersPage.module.css'
import Title from '../../Components/Title/Title'
import DateTime from '../../Components/Date/DateTime'
import Price from '../../Components/Price/Price'
import NotFound from '../../Components/Not Found/NotFound'

const initialState = {}

const reducer = (state, action) => {
    const {type, payload} = action
    switch(type){
        case 'ALL_STATUS':
            return {...state, allStatus: payload }
        case 'GROCERY_ORDERS_FETCHED':
            return {...state, orders: payload}
        default:
            return state
    }
}

export default function OrdersPage() {
    const [{ allStatus, orders }, dispatch ] = useReducer(reducer, initialState) 

    console.log(orders)
    const { filter } = useParams()

    useEffect(()=>{

        getAllStatus().then(status => {
            dispatch({ type: 'ALL_STATUS', payload: status})
        })

        getAllOrders(filter).then(orders => {
            dispatch({ type: 'GROCERY_ORDERS_FETCHED', payload: orders })
        })
    },[filter])

  return <div className={classes.container}>
        <Title title="Your Orders" margin="1.5rem 0 0 .2rem" fontSize="1.9rem" />
        
        {allStatus && (
            <div className={classes.allStatus}>
                <Link to={`/orders`} className={!filter ? classes.selected : ''}>
                    All
                </Link>
                {
                    allStatus.map(state => (
                        <Link key={state}
                            className={state === filter ? classes.selected : ''}
                            to={`/orders/${state}`}
                        >
                            {state}
                        </Link>
                    ))
                }
            </div>
        )}


        {orders?.length === 0 && (
            <NotFound
                linkRoute={filter ? '/orders' :  '/'}
                linkText={filter ? 'Show All' : 'Go To Home Page'}
            />
        )}





        {orders && orders.map(order => (
            <div key={order.id} className={classes.order_summary}>
                <div className={classes.header}>
                    <span>{order.id}</span>
                    <span>
                        { filter === "SHIPPED"? (<DateTime date={order.updatedAt}/>) : 
                        (<DateTime date={order.createdAt}/>)}
                    </span>
                    <span>
                        {order.status}
                    </span>
                </div>
                <div className={classes.items}>
                    {order.items.map(item =>(
                        <Link key={item.grocery.id} to={`/grocery/${item.grocery.id}`} >
                            <img src={item.grocery.imageUrl} alt={item.grocery.name}/>
                        </Link>
                    ))}
                </div>
                <div className={classes.footer}>
                    <Link to={`/track/${order.id}`}>Show Order</Link>
                    <div>
                        <span className={classes.price}>
                            <Price price={order.totalPrice} />
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
  
}
