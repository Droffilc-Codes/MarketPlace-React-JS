import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import classes from './adminStats.module.css'
import Input from '../../Components/Input/Input';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminStats() {
    const [kpiYear, setYear] = useState(new Date().getFullYear())
    const [orders, setOrders] = useState([]);
    const [totalPrices, setTotalPrices] = useState([]);
    const [totalOrders, setTotalOrders] = useState()
    const [totalRevenue, setTotalRevenue] = useState()
    const [labels, setLabels] = useState([]);
    const [deliveryRevenue, setDeliveryRevenue] = useState()
    const [totalDeliveryFeeByYear, setTotalDeliveryFeeByYear] = useState()
    const [totalOrdersByYear, setTotalOrdersByYear] =useState()

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const ordersData = await getAllOrders();
            setOrders(ordersData || []); // Default to empty array if undefined
        } catch (error) {
            console.error("Error loading orders:", error);
            setOrders([]);
        }
    };

   
    const chooseYear = (selectedYear) => {
        if(selectedYear){
            setYear(Number(selectedYear))   
        }
    }

    const currentYear = kpiYear;
    // const allMonths = Array.from({ length: 12 }, (_, index) => index);
    const allMonths = [0,1,2,3,4,5,6,7,8,9,10,11];

    useEffect(() => {

        if (orders.length === 0) return;

        // Test Label
        const label = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setLabels(label)

        
        const getTotalOrdersByMonth = []
        const totalDelliveriesRevenue = []

        const monthlyTotals = allMonths.map(month => {

            const filteredOrders = orders.filter(item => {
                const orderDate = new Date(item.createdAt);
                return (
                    orderDate.getMonth() === month &&
                    orderDate.getFullYear() === currentYear &&
                    item.status === 'PAYED'
                );
            });
                getTotalOrdersByMonth.push(filteredOrders)

                const delivery = filteredOrders.reduce((sum, order) => {
                    return sum + (order.delivery || 0)
                }, 0)
                totalDelliveriesRevenue.push(delivery)

            return filteredOrders.reduce((sum, order) => {
                return sum + (order.subTotal || order.totalPrice || 0);
            }, 0); 
        });
        const getOrdersByMonth = getTotalOrdersByMonth.map(item => item.length)        
        const totalRevenueByYear = monthlyTotals.reduce((prev, next) => { return prev + next }, 0)
        const totalAnnualDelliveriesRevenue = totalDelliveriesRevenue.reduce((prev, next)=> { return prev + next}, 0)
        const totalOrders = getOrdersByMonth.reduce((prev, next)=> {return prev + next}, 0)

        setTotalOrders(getOrdersByMonth)
        setTotalPrices(monthlyTotals);
        setTotalRevenue(totalRevenueByYear)
        setDeliveryRevenue(totalDelliveriesRevenue)
        setTotalDeliveryFeeByYear(totalAnnualDelliveriesRevenue)
        setTotalOrdersByYear(totalOrders)
    }, [orders, kpiYear]);


  

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Total Revenue",
                backgroundColor: "green",
                borderColor: "black",
                borderWidth: 2,
                data: totalPrices || Array(12).fill(0), // Fallback to zeros if undefined
            }
        ],
    };

    const orderData = {
        labels: labels,
        datasets: [
            {
                label: "Total Orders",
                backgroundColor: "darkblue",
                borderColor: "black",
                borderWidth: 2,
                data: totalOrders || Array(12).fill(0), // Fallback to zeros if undefined
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
                        <p>Year: {currentYear}</p>
                        <p>Total Revenue: ₦{totalRevenue?.toLocaleString()}</p>
                        <p>Profit: ₦{(totalRevenue * 0.1)?.toLocaleString()}</p>
                    </div>
                    <div className={classes.revenue_delivery}>
                        <h3 className={classes.kpi_header}>Annual Delivery Revenue</h3>
                        <p>Year: {currentYear}</p>
                        <p>Total Delivery Revenue: ₦{totalDeliveryFeeByYear?.toLocaleString()}</p>
                        <p>Profit: ₦{(totalDeliveryFeeByYear * 0.20)?.toLocaleString()}</p>
                    </div>
                </div>
                <div className={classes.left_charts}>
                    <Bar data={orderData} className={classes.orderData} />
                    <Bar data={chartMaker(labels, "Delivery Revenue", "Brown", "lightgrey", deliveryRevenue)} className={classes.orderData} />
                    <div className={classes.revenue_delivery}>
                        <h3 className={classes.kpi_header}>Averge Order Value</h3>
                        <p>Total Revenue: ₦{totalRevenue?.toLocaleString()}</p>
                        <p>Total Orders: {totalOrdersByYear?.toLocaleString()}</p>
                        <p>Averge Order Value: ₦{(totalOrdersByYear === 0 || isNaN(totalRevenue / totalOrdersByYear)) ? '0' : (totalRevenue / totalOrdersByYear)?.toLocaleString()}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
