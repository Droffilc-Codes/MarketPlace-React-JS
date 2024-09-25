import React from 'react'

export default function Price({price}) {
   
    
    function formatPrice(){
       return price.toLocaleString()
    }


  return <span>₦{formatPrice()}</span>
}


