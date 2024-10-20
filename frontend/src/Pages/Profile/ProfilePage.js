import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../Hook/useAuth'
import classes from './profilePage.module.css'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Buttons from '../../Components/Buttons/Buttons'
import ChangePassword from '../Change Password/ChangePassword'

export default function ProfilePage() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        } = useForm()

    const { user, updateUserProfile } = useAuth()

    const submit =  async user => {
        //Updates User Profile
        await updateUserProfile(user)
    }
  return  <div className={classes.container}>
    <div className={classes.details}>
        <Title title="Update User Profile" />
        <form onSubmit={handleSubmit(submit)} noValidate>
        <Input
            defaultValue={user.name} 
            type="text"
            label="Name"
            {...register('name', {
            required: true,
            minLength: 5
            })}
            error={errors.name}
        />
        <Input 
            defaultValue={user.phone}
            type="number"
            label="Phone Number"
            {...register('phone', {
            required: true,
            minLength: 11
            })}
            error={errors.phone}
        />
        <Input 
            defaultValue={user.address}
            type="text"
            label="Address"
            {...register('address', {
            required: true,
            minLength: 10
            })}
            error={errors.address}
        />
        <Buttons type='submit' text='Update Profile' backgroundColor='#008AD1' />
        </form>
            <ChangePassword />
    </div>
    </div>
  
}
