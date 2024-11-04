import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Title from '../../Components/Title/Title'
import Buttons from '../../Components/Buttons/Buttons'
import Input from '../../Components/Input/Input'
import { Link } from 'react-router-dom'
import classes from './RegisterPage.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hook/useAuth'
import { EMAIL } from '../../constants/patterns'

export default function RegisterPage() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const returnurl = params.get('returnurl')
    const auth = useAuth()
    const { user } = auth

    useEffect(()=>{
        if(!user) return
        returnurl ? navigate(returnurl) : navigate('/')
    }, [user])

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        } = useForm()

    const submit = async data => {
        await auth.register(data)
    }

  return (
    <div className={classes.container}>
        <div className={classes.details}>
            <Title title="Register" />
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input 
                 type="text"
                 label="Name"
                 {...register('name', {
                    required: true,
                    minLength: 5
                 })}
                 error={errors.name}
                />
                <Input 
                 type="email"
                 label="Email"
                 {...register('email', {
                    required: true,
                    pattern: EMAIL
                 })}
                 error={errors.email}
                />
                <Input 
                 type="number"
                 label="Phone Number"
                 {...register('phone', {
                    required: true,
                    minLength: 11
                 })}
                 error={errors.phone}
                />
                <Input 
                 type="password"
                 label="Password"
                 {...register('password', {
                    required: true,
                    minLength: 5
                 })}
                 error={errors.password}
                />
                <Input 
                 type="password"
                 label="Confirm Password"
                 {...register('confirmpassword', {
                    required: true,
                   validate: value => value !== getValues('password') ? 'Passwords Do not Match' : true,
                 })}
                 error={errors.confirmpassword}
                />
                <Input 
                 type="text"
                 label="Address"
                 {...register('address', {
                    required: true,
                    minLength: 10
                 })}
                 error={errors.address}
                />

                <Buttons type='submit' text='Register'/>

                <div className={classes.login}>
                    Already a User ? &nbsp;
                    <Link to={`/login${returnurl ? '?returnurl=' + returnurl : ''}`}>
                        Login here
                    </Link>

                </div>
            </form>

        </div>
    </div>
  )
}
