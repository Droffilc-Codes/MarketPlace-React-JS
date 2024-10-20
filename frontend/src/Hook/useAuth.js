import { useState, useContext, createContext } from "react";
import * as userService from '../Services/userService'
import {toast} from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(userService.getUser())

    const login = async (email, password) =>{
        try{
            const user = await userService.login(email, password)
            setUser(user)
            toast.success('Login Successful')
        }catch (err){
            toast.error(err.response.data)
        }
    }

    const register = async data => {
        try{
            const user = await userService.register(data)
            setUser(user)
            toast.success('Registered Successfully')
        }catch(err){
            toast.error(err.response.data)
        }
    }


    const updateUserProfile = async user => {
        //there should be no try, but let us add it
        try{
            const updatedUser = await userService.updateUserProfile(user)
            toast.success('Userprofile Updated Successfully')
            if (updatedUser) setUser(updatedUser)

        }catch(error){
            toast.error('Can not save!')
        }
    }

    const updateUserPassword = async password => {
        await userService.updatePassword(password)
        logout()
        toast.success('Password Updated Successfully')
    }

    const logout = ()=>{
        userService.logout()
        setUser(null)
        toast.success('Logout Successful')
    }

    return (
        <AuthContext.Provider value={{user, login, logout, register, updateUserProfile, updateUserPassword}} >
            {children}
        </AuthContext.Provider>
    )



}

export const useAuth = () => useContext(AuthContext)