import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import classes from './usersPage.module.css'
import Title from '../../Components/Title/Title'
import { getAllUsers, toggleBlock } from '../../Services/userService'
import { useAuth } from '../../Hook/useAuth'
import Search from '../../Components/Search/Search'

export default function UsersPage() {
    const [ users, setUsers ] = useState()
    const { searchTerm } = useParams()
    const auth = useAuth()

    useEffect(()=>{
        loadAllUsers()

    }, [searchTerm])

    const loadAllUsers = async () => {
        const users = await getAllUsers(searchTerm)
        setUsers(users)
    }
    const handleToggleBlock = async (userId) =>{
        const isBlocked = await toggleBlock(userId)

        setUsers(oldUsers => oldUsers.map(user => user.id === userId? {...user, isBlocked} : user) )
    }

  return <div className={classes.container}>
        <div className={classes.list}>
            <Title title="Manage Users" />

            <Search 
                searchRoute='/admin/Users/'
                defaultRoute='/admin/Users'
                margin="1rem 0"
                placeholder='Search Users'
            />

            <div className={classes.list_item}>
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>Address</h3>
                <h3>Phone</h3>
                <h3>Admin</h3>
                <h3>Actions</h3>
            </div>

            {
                users && 
                users.map(user => 
                    <div key={user.id} className={classes.list_item}>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.address}</span>
                        <span>0{user.phone}</span>
                        <span>{user.isAdmin? '✅' : '❌'}</span>
                        <span className={classes.actions}>
                            <Link to={'/admin/editUser/' + user.id}>Edit</Link>
                            {
                                auth.user.id !== user.id && (

                                <Link onClick={()=> handleToggleBlock(user.id)}>
                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                </Link>

                                )
                            }
                        </span>
                    </div>
                )
            }
        </div>
    </div>
  
}
