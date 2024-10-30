import React from 'react'
import { useBag } from '../../Hook/useBag/useBag'
import { useAuth } from '../../Hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createOrder } from '../../Services/orderService'
import classes from './CheckoutPage.module.css'
import Title from '../../Components/Title/Title'
import Buttons from '../../Components/Buttons/Buttons'
import Input from '../../Components/Input/Input'
import OrderItemList from '../../Components/OrderItemList/OrderItemList'
import Map from '../../Components/Map/Map'

export default function CheckoutPage() {
    const { bag } = useBag()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [orders, setOrder] = useState({...bag})

    const {
        handleSubmit,
        register,
        formState: { errors },
        } = useForm()

const submit = async data  => {
    if( !orders.addressLatLng){
        toast.error("Please select your location on the Map")
        return
    }
    //Check if any order is less than 0 in quantity
    console.log(orders)

    await createOrder({...orders, name: data.name, address: data.address, phone: data.phone})
    navigate('/payment')
}

  return (
    <>
        <form onSubmit={handleSubmit(submit)} className={classes.container} >
            <div className={classes.content}>
                <Title title="Order Form" fontSize="1.6rem"/>
                <div className={classes.inputs}>
                    <Input 
                        defaultValue={user.name}
                        label="Name"
                        {...register('name')}
                        error={errors.name}
                    />
                    <Input 
                        defaultValue={user.address}
                        label="Address"
                        {...register('address')}
                        error={errors.address}
                    />
                    <Input 
                        defaultValue={user.phone}
                        label="Phone"
                        {...register('phone')}
                        error={errors.phone}
                    />

                </div>
                    <OrderItemList orders={orders}/>
            </div>

            <div>
                <Title title="Choose your Location" fontSize="1.6rem" />
                <Map 
                    location={orders.addressLatLng}
                    onChange={latLng => {
                        console.log(latLng)
                        setOrder({...orders, addressLatLng: latLng})
                    }}

                />
            </div>

            <div className={classes.buttons_container}>
                <div className={classes.buttons}>
                    <Buttons 
                        type='submit'
                        text='Go to Payment'
                        width='100%'
                        height='3rem'
                    />

                </div>
            </div>

        </form>
    
    </>
  )
}
