import React, { useEffect, useState } from 'react'
import { shopPayments, updateShopPayments } from '../../Services/accountService'
import classes from './paymentApproval.module.css'
import DateTime from '../../Components/Date/DateTime'
import Price from '../../Components/Price/Price'
import toast from 'react-hot-toast'
import useRevenue from '../../Hook/useRevenue'

export default function ApprovePay() {
    const [getPayments, setGetPayment] = useState()
    const [paymentId, setPaymentId] = useState()
    const [approvedPays, setApprovedPays] = useState()
    const [isChecked, setIsChecked] = useState(false)
    const { totalRevenue } = useRevenue()
    const [settlements, setSettlements] = useState()
    const [annualRevenue, setAnnualRevenue] = useState()

    useEffect(()=>{
        getAllPayments()
        getApprovedPayments()

        if (totalRevenue !== undefined && settlements !== undefined) {
          const revenue = totalRevenue - settlements;
          console.log("Calculated Annual Revenue:", revenue);
          setAnnualRevenue(revenue);
        }


    },[paymentId,settlements, totalRevenue])
    
    const getAllPayments = async () => {
        const showPayments = await shopPayments()
        const notApproved =  showPayments.filter(item => item.isApproved === false)
        setGetPayment(notApproved)
    }

    const getApprovedPayments = async () => {
      const showPayments = await shopPayments()
      const approvdPayments = showPayments.filter(item => item.isApproved === true)
      const totalSetllements = approvdPayments.reduce((sum, payments)=> sum + (payments.totalAmount), 0 )
      setSettlements(totalSetllements)
      setApprovedPays(approvdPayments)
    }

    

    const approvePayment =  async (e, payment_id) => {
      console.log(payment_id)
      await updateShopPayments(payment_id)
      toast.success("Seller's payment has been approved", {
        duration: 5000,
      })
      setPaymentId(payment_id)
      setIsChecked(e.target.checked)
    }




  return (
    <div className={classes.container}>
        <h1>Bank Balance: {annualRevenue && <Price price={annualRevenue} /> }</h1>
      <div className={classes.content}>

        

      <div className={classes.payment_item_headers}>
                <h3>Payment Id</h3>
                <h3>Shop Name</h3>
                <h3>Total Amount</h3>
                <h3>Date</h3>
                <h3>Approve Payment</h3>

      </div>
      {
        getPayments &&

        getPayments.map((item, index) => (
          <div className={classes.payment_item} key={index}>
            <span>{item._id}</span>
            <span>{item.shopName}</span>
            <span> <Price price={item.totalAmount} /></span>
            <span><DateTime date={item.date} /></span>
            <span className={classes.paid_box}>
              <input 
                  type="checkbox" 
                  checked = {isChecked}
                  onChange={(e)=> approvePayment(e, item._id)}

             /></span>
          </div>
        ))
      }
      <div className={classes.approved_headers}>
                <h3>Payment Id</h3>
                <h3>Shop Name</h3>
                <h3>Total Amount</h3>
                <h3>Date</h3>
                <h3>Approval Status</h3>

      </div>
      {
        approvedPays && 

        approvedPays.map((item, index)=>(
          <div className={classes.approved} key={index}>
            <span>{item._id}</span>
            <span>{item.shopName}</span>
            <span> <Price price={item.totalAmount} /></span>
            <span><DateTime date={item.updatedAt} /></span>
            {
              item.isApproved && <span>Approved</span>
            }
          </div>
        ))
      }
      </div>
      
    </div>
  )
}
