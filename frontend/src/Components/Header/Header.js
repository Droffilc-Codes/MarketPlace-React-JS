import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {

    const user = {
      name: "Ada"
    }

    const logout = () => {}


    const cart = {
      totalCount: 20
    }

  return <header className={classes.header} >

      <div className={classes.container}>
        
        <Link to="/" className={classes.logo} ><img src={'/Grocery/Mart-logo.png'} alt={"COLLIF MART"}/></Link>
        
        <nav>
          <ul>

            {
            
              user? (

              <li className={classes.menu_container}>
                
                <Link to="/user-profile">{user.name}</Link>

                <div className={classes.menu}>

                  <Link to="/user-profile">Profile</Link>
                  <Link to="/orders">Orders</Link>
                  <Link to="/logout" onClick={logout}>Logout</Link>

                </div>


              </li>


              ) : (

                <li> <Link to="/login">Login</Link>  </li>
              )
              
            }

              <li>
                <Link to="/cart">
                  Cart {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                </Link>
              </li>
          </ul>
        </nav>

      </div>
    
    </header>
}
