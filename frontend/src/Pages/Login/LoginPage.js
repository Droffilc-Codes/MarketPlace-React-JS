import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../Hook/useAuth'
import classes from './LoginPage.module.css'
import Title from '../../Components/Title/Title'
import Input from '../../Components/Input/Input'
import Buttons from '../../Components/Buttons/Buttons'
import { EMAIL } from '../../constants/patterns'

export default function LoginPage() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        } = useForm()

    const navigate = useNavigate()
    const { user, login } = useAuth()
    const [params] = useSearchParams()
    const returnurl = params.get('returnurl')

    useEffect(()=>{
        if (!user) return
        returnurl ? navigate(returnurl) : navigate('/') 
    },[user])


    const submit = async ({ email, password }) =>{
        await login(email, password)
    }

  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title={"Login"}/>
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input 
                    type="email"
                    label="Email"
                    {...register('email',{
                        required: true,
                        pattern:EMAIL
                    })}
                    error={errors.email}
                />

                <Input 
                
                    type="password"
                    label="Password"
                    {...register('password',{
                        required: true,
                    })}
                    error={errors.password}
                />
                <Buttons type="submit" text="Login" />

                <div className={classes.register}>
                    New User? &nbsp;
                    <Link to={`/register${returnurl ? '?returnurl=' + returnurl : ''}`}>
                        Register here
                    </Link>
                </div>
            </form>
        </div>
     
    </div>
  )
}
