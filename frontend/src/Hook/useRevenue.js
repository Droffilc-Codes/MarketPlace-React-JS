import { useEffect, useState } from 'react'
import { getAllOrders } from '../Services/orderService'

export default function useRevenue(selectedYear = new Date().getFullYear(), expense) {
    const [orders, setOrders] = useState([])  
    const [revenueByMonth, setRevenueByMonth] = useState(Array(12).fill(0))
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [orderCount, setOrderCount] = useState(Array(12).fill(0))
    const [totalDeliveryFeeByYear, setTotalDeliveryFeeByYear] = useState()
    const [monthlyDeliveryRevenue, setMonthlyDeliveryRevenue] = useState(Array(12).fill(0))
    const [monthLabels, setMonthlabels] = useState([]);
    const [totalOrdersTodate, setTotalOrdersTodate] =  useState()

    useEffect(()=>{
        const loadOrders = async () =>{
            const orders = await getAllOrders()
            setOrders(orders)
        }

        loadOrders()
    },[])


    useEffect(()=>{
        if(orders.length === 0) return

        // Month labels
        const monthTitles = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setMonthlabels(monthTitles);

        const monthlyRevenue = Array(12).fill(0)
        
        const numberOfOrdersByMonth = Array(12).fill(0) //Total Orders by month

        const revenueFromDeliveryByMonth = Array(12).fill(0)

        for(let month = 0; month < 12; month++){

            const filterOrders = orders.filter(item => {
                const orderDate = new Date(item.createdAt)
                const isCurrentMonth  = orderDate.getMonth() === month && orderDate.getFullYear() === selectedYear
                const isShippedAndPayed = item.status === 'PAYED' || item.status === 'SHIPPED'

                return isCurrentMonth  && isShippedAndPayed // return all items that have same month and year and has status as either shipped or payed
             })

             const sumRevenueByOrder = filterOrders.reduce((sum, orders)=> 
                sum + (orders.totalPrice || orders.subTotal), 0
            ) // for all orders in month X; add 0 (initial value of sum) to totalPrice. do this until you get sum into sumRevenueByOrder

             const deliveryFees = filterOrders.reduce((sum, orders) => sum + (orders.delivery || 0), 0) 
             // for one order in month X; add 0 (initial value of sum) to delivery amount. Go to next line 

            monthlyRevenue[month] = sumRevenueByOrder // push current value of sumRevenueByOrder to index X in monthlyRevenue[X]
            numberOfOrdersByMonth[month] = filterOrders // get orders for each month
            revenueFromDeliveryByMonth[month] = deliveryFees
        }

        const total = monthlyRevenue.reduce((prev, next) => prev + next, 0)

        const getTotalOrdersByMonth = numberOfOrdersByMonth.map(item => item.length) // get orders by length

        const totalAnnualDeliveriesRevenue = revenueFromDeliveryByMonth.reduce((prev, next) => prev + next, 0)

        const totalOrdersByYear = getTotalOrdersByMonth.reduce((prev, next) => prev + next, 0)
        
        setTotalDeliveryFeeByYear(totalAnnualDeliveriesRevenue)
        setRevenueByMonth(monthlyRevenue)
        setTotalRevenue(total)
        setOrderCount(getTotalOrdersByMonth)
        setMonthlyDeliveryRevenue(revenueFromDeliveryByMonth)
        setTotalOrdersTodate(totalOrdersByYear)
    },[orders, selectedYear])
    
  return {revenueByMonth, totalRevenue, orderCount, totalDeliveryFeeByYear, monthlyDeliveryRevenue, monthLabels, totalOrdersTodate}
}
