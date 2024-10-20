import axios from 'axios'

export const getUser = () => 
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

export const login = async (email, password) =>{
    const { data } = await axios.post('api/users/login', { email, password })
    localStorage.setItem('user', JSON.stringify(data))
    return data 
}

export const register = async registerData => {
    const { data } = await axios.post('api/users/register', registerData)
    localStorage.setItem('user', JSON.stringify(data))
    return data 
}

export const logout = () =>{
    localStorage.removeItem('user')
}

export const updateUserProfile = async user => {
    const { data } = await axios.put('api/users/updateUserProfile', user)
    localStorage.setItem('user', JSON.stringify(data))
    return data
}

export const updatePassword = async password => {
    await axios.put('api/users/updateUserPassword', password)

}