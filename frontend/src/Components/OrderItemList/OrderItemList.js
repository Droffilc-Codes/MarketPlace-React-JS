import React from 'react'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'
import classes from './OrderItemList.module.css'

export default function OrderItemList({orders}) {
  return (
    <table className={classes.table}>
        <tbody>
            <tr>
                <td colSpan="5">
                    <h3>Order Items:</h3>
                </td>
            </tr>
            {orders.items.map(item =>(
                <tr key={item.grocery.id}>
                    <td>
                        <Link to={`/grocery/${item.grocery.id}`}>
                            <img src={item.grocery.imageUrl} />
                        </Link>
                    </td>
                    <td>{item.grocery.name}</td>
                    <td>
                        <Price price={item.grocery.price} />
                    </td>
                    <td>{item.quantity}</td>
                    <td><Price price={item.price} /></td>
                </tr>
            ) ) }

            <tr>
                <td colSpan="3"></td>
                <td>
                    <strong>Total :</strong>
                </td>
                <td>
                    <Price price={orders.totalPrice} />
                </td>
            </tr>
        </tbody>
    </table>
  )
}
