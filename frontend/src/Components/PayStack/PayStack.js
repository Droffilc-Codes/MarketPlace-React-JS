import React from 'react'
import { PaystackButton } from 'react-paystack'
import toast from 'react-hot-toast'
import { pay } from '../../Services/orderService'
import { useBag } from '../../Hook/useBag/useBag'
import { useNavigate } from 'react-router-dom'
import { stockUpdateResponse } from '../../Services/groceryServices'
import classes from './PayStack.module.css'

export default function PayStack({order, email}) {
    const { clearBag } = useBag()
    const navigate = useNavigate()
    const publicKey = 'pk_test_534ce0f6fd60358b1ebdcd7707355b03449bb507'
 

    const onSuccess = async (response) => {

        try {

             // Prepare the items for stock update
                const stockUpdateData = order.items.map(item => ({
                    groceryId: item.grocery.id,  
                    quantity: item.quantity      
                }));

            // Send the payment details to your backend
            const paymentId = {
                reference: response.reference, // Paystack transaction reference
                orderId: order.id,             // Your order ID
                email: order.email,
                amount: order.totalPrice
            }

            // Make a POST request to save the payment details on the server
            const orderId = await pay(paymentId.reference)
            if (orderId) {
                //Try stockupdate
                const checkStock = await stockUpdateResponse( stockUpdateData )
                if(checkStock){
                    console.log("Stock Updated Succeffully")
                    // Handle clearing the cart, redirecting, etc.
                    clearBag()
                    // Pass the items to router to reduce stock
                    toast.success("Payment saved successfully", 'Success')
                    navigate(`/track/${order.id}`)
                }
            
            } else {
                toast.error("Payment Save Failed", 'Error')
            }
        } catch (error) {
            console.error("Error saving payment: ", error)
            // Save failed payments here using this
            //const orderId = await failedpay(paymentId.reference)
            toast.error("Payment Save Failed")
        }
    }


    const componentProps = {
        email,
        amount: order.totalPrice * 100,
        metadata : {
            name: order.name,
            phoneNumber: order.phone
        },
        publicKey,
        text: "Pay Now",
        onSuccess,
        onClose: () =>{
            toast("Are you sure you want to close?", {
              duration: 6000,
            })
        },
        onError: (error) => {
            toast.error("Payment failed. Please try again.")
        }
    }

  return (
        <div className={classes.paystack_container}>
                <PaystackButton {...componentProps}  className={classes.paystack_button}/>
            
        </div>
        
  )
}
