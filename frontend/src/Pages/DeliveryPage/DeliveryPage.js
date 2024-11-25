import React, { useEffect, useState } from 'react'
import { changeOrderStatus, getAllOrders } from '../../Services/orderService'
import classes from './deliveryPage.module.css'
import DateTime from '../../Components/Date/DateTime'
import Price from '../../Components/Price/Price'
import Input from '../../Components/Input/Input'
import toast from 'react-hot-toast'
import Title from '../../Components/Title/Title'
import Search from '../../Components/Search/Search'
import NotFound from '../../Components/Not Found/NotFound'
import { useParams } from 'react-router-dom'
import { all } from 'axios'

export default function DeliveryPage() {
    const [allOrders, setAllOrders] = useState([])
    const [orderID, setOrderID] = useState()
    const { searchTerm } = useParams()

    useEffect(()=>{
        
        loadAllOrders()

    },[orderID])

    const loadAllOrders = async () => {
        const Orders =  await getAllOrders("PAYED")
        setAllOrders(Orders)
    }

    useEffect(()=>{
       

        if(searchTerm){
            const filteredOrders =  allOrders.filter(order => {
                return order._id === searchTerm
               })
            setAllOrders(filteredOrders.length > 0 ? filteredOrders : null)
              
        }else{
            loadAllOrders()
        }
        
    },[searchTerm])


  
   const delivered = async (orderId) => {
    await changeOrderStatus(orderId)
    toast.success(`Grocery with Order ID:${orderId} shipped successfully`, {
        duration: 5000,
    })
    setOrderID(orderId)
   }


  return (
    <div className={classes.container}>
        <Title title="Delivery Management"/>
        <Search 
            placeholder = "Search for orders by ID"
            searchRoute="/admin/delivery/"
            defaultRoute = "/admin/delivery"
            margin="1rem 0"
        />

        <div className={classes.content}>
            <div className={classes.order_list_headers}>
                <h3>Order Id</h3>
                <h3>Date</h3>
                <h3>Status</h3>
                <h3>Price</h3>
                <h3>Ship</h3>

            </div>
            {
                allOrders
                    ?
                (
                    allOrders.map(order => (
                        <div key={order.id} className={classes.order_list}>
                            <span>{order.id}</span>
                            <span><DateTime date={order.createdAt} /></span>
                            <span>{order.status}</span>
                            <span><Price price={order.totalPrice} /></span>
                            <span className={classes.deliver_box} >
                                <Input 
                                    type="checkbox"
                                    onChange={()=> delivered(order.id)}
                                />
                            </span>
                        </div>
                    ))
                ) : (<NotFound  linkRoute='/admin/delivery' linkText='Go Back'/>)
            }
        </div>
    </div>
  )
}
