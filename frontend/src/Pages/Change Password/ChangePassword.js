import React from 'react'
import { useForm } from 'react-hook-form'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Buttons from '../../Components/Buttons/Buttons'
import { useAuth } from '../../Hook/useAuth'

export default function ChangePassword() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        } = useForm()

    const { updateUserPassword } = useAuth()

    const submit = newpassword => {
        //update password
        updateUserPassword(newpassword)
    }
    
  return  <div>
    <Title title="Change Password"  />
    <form onSubmit={handleSubmit(submit)} >
        <Input 
            type="password"
            label="Current Password"
            {...register('currentPassword', {
            required: true,
            })}
            error={errors.currentPassword}
        />
        <Input 
            type="password"
            label="New Password"
            {...register('newPassword', {
            required: true,
            minLength: 5,
            })}
            error={errors.newPassword}
        />
        <Input 
            type="password"
            label="Confirm Password"
            {...register('confirmNewPassword', {
            required: true,
            validate: value => value !== getValues('newPassword') ? 'Passwords Do not Match' : true,
            })}
            error={errors.confirmNewPassword}
        />
        <Buttons type='submit' text='Update Password' />
    </form>
      
    </div>
  
}
