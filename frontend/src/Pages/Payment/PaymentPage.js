import React, {useEffect, useState} from 'react'
import classes from './PaymentPage.module.css'
import { getNewOrderForCurrentUser } from '../../Services/orderService'
import Title from '../../Components/Title/Title'
import OrderItemList from '../../Components/OrderItemList/OrderItemList'
import Map from '../../Components/Map/Map'
import PayStack from '../../Components/PayStack/PayStack'
//
import { useAuth } from '../../Hook/useAuth'
// import Buttons from '../../Components/Buttons/Buttons'

export default function PaymentPage() {
    const {user} = useAuth()
    const [order, setOrder] = useState()

    useEffect(()=>{
        getNewOrderForCurrentUser().then( data => setOrder(data))
    }, [])

    if (!order) return

  return <>
    
    <div className={classes.container}>
        <div className={classes.content}>
            <Title title="Order Form" fontSize="1.6re"/>
            <div className={classes.summary}>
                <div>
                    <h3>Name:</h3>
                    <span>{order.name}</span>
                </div>
                <div>
                    <h3>Address:</h3>
                    <span>{order.address}</span>
                </div>
                <div>
                    <h3>Phone:</h3>
                    <span>{order.phone}</span>
                </div>
            </div>
            <OrderItemList orders={order} />
        </div>
        <div className={classes.map}>
            <Title title="Shipping Location" fontSize="1.6.rem"/>
            <Map readonly={true} location={order.addressLatLng}  />
        </div>

       
        <div >
            <div >
                    <PayStack order={order}  email={user.email} />
            </div>

        </div>
    </div>
  
  </>
}
