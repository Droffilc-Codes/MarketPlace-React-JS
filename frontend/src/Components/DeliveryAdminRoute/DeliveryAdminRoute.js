import React from 'react'
import { useAuth } from '../../Hook/useAuth'
import NotFound from '../Not Found/NotFound'
import AuthRoute from '../AuthRoute/AuthRoute'

function DeliveryAdminRoute({children}) {
    const { user } = useAuth()
  return user.isAdmin && user.isDeliveryAdmin ? children : (

      <NotFound
        linkRoute='/dashboard'
        linkText='Go To Dashboard'
        message="You don't have access to this Page!"
      />
  )
}

const DeliveryAdminRouteExport = ({children}) => 
    <AuthRoute>
        <DeliveryAdminRoute>
            {children}
        </DeliveryAdminRoute>
    </AuthRoute>


export default DeliveryAdminRouteExport