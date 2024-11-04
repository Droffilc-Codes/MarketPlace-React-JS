import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { getUserById, updateUser } from '../../Services/userService'
import classes from './userEdit.module.css'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import { EMAIL } from '../../constants/patterns'
import Buttons from '../../Components/Buttons/Buttons'

export default function UserEdit() {
    const {register, reset, handleSubmit, formState: {errors}} = useForm()

    const { userId } = useParams()

    const isEditMode = userId

    useEffect(()=>{

        if(isEditMode) loadUser()

    },[userId])

    const loadUser = async () => {
        const user = await getUserById(userId)
        reset(user)
    }

    const submit = async userData => {
        await updateUser(userData)
    }

  return <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit User' : 'Add User'} />

        <form onSubmit={handleSubmit(submit)} noValidate>

            <Input label="Name"
            {...register('name', {required: true, minLength: 3})}
            error={errors.name}
            />

            <Input label="Email"
            {...register('email', {required: true, pattern: EMAIL})}
            error={errors.email}
            />

            <Input 
             label="Phone Number"
                {...register('phone', { required: true, minLength: 11 })}
                error={errors.phone}
            />
            
            <Input label="Address"
             {...register('address', { required: true, minLength: 10 })}
                error={errors.address}
            />

            <Input label="Admin"
            type="checkbox"
            {...register('isAdmin', )}
            error={errors.isAdmin}
            />

            <Buttons type='submit' text={isEditMode ? 'submit' : 'create'}/>

        </form>

      </div>
    </div>
  
}
