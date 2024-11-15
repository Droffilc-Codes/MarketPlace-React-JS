import React, { useState } from 'react'
import useRevenue from '../../Hook/useRevenue'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import classes from './adminStats.module.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminStats() {

    const [kpiYear, setYear] = useState(new Date().getFullYear())

    const { revenueByMonth, totalRevenue, orderCount, totalDeliveryFeeByYear, monthlyDeliveryRevenue, monthLabels, totalOrdersTodate} = useRevenue(kpiYear)


    const chooseYear = (selectedYear) => {
        if(selectedYear){
            setYear(Number(selectedYear))   
        }
    }

    const chartData = {
        labels: monthLabels,
        datasets: [
            {
                label: "Total Revenue",
                backgroundColor: "green",
                borderColor: "black",
                borderWidth: 2,
                data: revenueByMonth || Array(12).fill(0), // Fallback to zeros if undefined
            }
        ],
    };

    const orderData = {
        labels: monthLabels,
        datasets: [
            {
                label: "Total Orders",
                backgroundColor: "darkblue",
                borderColor: "black",
                borderWidth: 2,
                data: orderCount || Array(12).fill(0), // Fallback to zeros if undefined
            }
        ],
    };

    const chartMaker = (labels, labelText, bgColor, bdColor, data) => {
        return ({
            labels: labels,
            datasets: [
                {
                    label: labelText,
                    backgroundColor: bgColor,
                    borderColor: bdColor,
                    borderWidth: 2,
                    data: data || Array(12).fill(0), // Fallback to zeros if undefined
                }
            ],
        })
    }
   return (
    <div>
     
            <div className={classes.container}>
                
                <h1>Admin Stats</h1>
                    <select name='Year' value={kpiYear} className={classes.year}  onChange={e => chooseYear(e.target.value)}>
                        <option value={kpiYear-1} >{kpiYear-1}</option>
                        <option value={kpiYear}>{kpiYear}</option>
                        <option value={kpiYear+1}>{kpiYear + 1}</option>
                    </select>

                <div className={classes.content}>
                    <div className={classes.right_charts}>
                        <Bar data={chartData} className={classes.orderData} />  
                        <div className={classes.revenue_info}>
                            <h3 className={classes.kpi_header}>Annual Revenue</h3>
                            <p>Year: {kpiYear}</p>
                            <p>Total Revenue: ₦{totalRevenue?.toLocaleString()}</p>
                            <p>Profit: ₦{(totalRevenue * 0.1)?.toLocaleString()}</p>
                        </div>
                        <div className={classes.revenue_delivery}>
                            <h3 className={classes.kpi_header}>Annual Delivery Revenue</h3>
                            <p>Year: {kpiYear}</p>
                            <p>Total Delivery Revenue: ₦{totalDeliveryFeeByYear?.toLocaleString()}</p>
                            <p>Profit: ₦{(totalDeliveryFeeByYear * 0.20)?.toLocaleString()}</p>
                        </div>
                    </div>
                <div className={classes.left_charts}>
                    <Bar data={orderData} className={classes.orderData} />
                    <Bar data={chartMaker(monthLabels, "Delivery Revenue", "Brown", "lightgrey", monthlyDeliveryRevenue)} className={classes.orderData} />
                    <div className={classes.revenue_delivery}>
                        <h3 className={classes.kpi_header}>Averge Order Value</h3>
                        <p>Total Revenue: ₦{totalRevenue?.toLocaleString()}</p>
                        <p>Total Orders: {totalOrdersTodate?.toLocaleString()}</p>
                        <p>Averge Order Value: ₦{(totalOrdersTodate === 0 || isNaN(totalRevenue / totalOrdersTodate)) ? '0' : (totalRevenue / totalOrdersTodate)?.toLocaleString()}</p>
                    </div>
                </div>

            </div>
            </div>
    </div>
  )
}
