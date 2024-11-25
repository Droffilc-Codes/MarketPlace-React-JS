import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import classes from './accounts.module.css'
import Title from '../../Components/Title/Title';
import Search from '../../Components/Search/Search';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/Not Found/NotFound';
import Buttons from '../../Components/Buttons/Buttons';

export default function ShopAccounts() {
    const [allOrders, setAllOrders] = useState([]);
    const [shopSales, setShopSales] = useState({});
    const  { searchTerm } = useParams()
    const [theDate, setTheDate] = useState(new Date())
    const [theYear, setTheYear] = useState(new Date())
    const [theMonth, setTheMonth] = useState()
    const [theDay, setTheDay] = useState()


    const getSelectedDate = (date) => {  
        setTheDate(date) 
        setTheYear(new Date(date).getFullYear())
        setTheMonth(new Date(date).getMonth()) 
        setTheDay(new Date(date).getDate())
    }

   


    useEffect(() => {
        loadOrders();
    }, [searchTerm, theDate]);

    const loadOrders = async () => {
        const getOrders = await getAllOrders();
        setAllOrders(getOrders);
        calculateShopSales(getOrders);
    };

    const calculateShopSales = (orders) => {
        const sales = {};
       //
       
        const filterOrders = orders.filter(item => {
            
            const isShippedAndPayed = item.status === 'PAYED' || item.status === 'SHIPPED'

            return isShippedAndPayed // return all items that have same month and year and has status as either shipped or payed
         })

         const month = theMonth // can be set to month
         const selectedYear = theYear // can be set to year
         const day = theDay // can be set to day

        const secondTest = filterOrders.filter(item => {
            const orderDate = new Date(item.createdAt)
                const isCurrentMonth  = orderDate.getMonth() === month && orderDate.getFullYear() === selectedYear 
                && orderDate.getDate() === day

                return isCurrentMonth   // return all items that have same month and year and has status as either shipped or payed
        })
            // console.log(secondTest)

        //
        secondTest.forEach(order => {
        // orders.forEach(order => {
            
            
            order.items.forEach(item => {
                const shopName = item.grocery.shop;
                const totalAmount = item.price;
                

                if (sales[shopName]) {
                    sales[shopName] += totalAmount;
                
                } else {
                    sales[shopName] = totalAmount
                }
            });
          
        });
        

        
        if(searchTerm){

            const getOneShop =
            Object.entries(sales)
                    .filter(shop => {
                return shop[0].includes(searchTerm) })
            

                if(getOneShop.length === 0){
                    setShopSales(null)
                }else{
                    console.log(getOneShop) //
                    const shopBalance = {}
                    shopBalance[getOneShop[0][0]] = getOneShop[0][1]
                    setShopSales(shopBalance)
                }
        }else{
            setShopSales(sales);
            console.log(sales) //

        }

    };

    const acctData = [   ]
  
    const recordPayment = (e) => {
        // acctData.push(e)
        const name = e.target.value 
    }
    

    return (
        <div className={classes.container}>
            <Title title="Shop Accounts"/>
            
            <Search 
                placeholder = "Search for Shops"
                searchRoute="/admin/accounts/"
                defaultRoute = "/admin/accounts"
                margin="1rem 0"
            
            />

            <div>
                <input type='date' onChange={(e)=> {getSelectedDate(e.target.value)}} />
            </div>

           {
            shopSales ? (
                <ul className={classes.salesList}>
                {Object.entries(shopSales).map(([shopName, totalAmount]) => (
                    
                    <li key={shopName} className={classes.salesItem}>
                        <form action="">

                            <span className={classes.shopName}><input type="text" readOnly defaultValue={shopName} /></span>

                            <span className={classes.shopName}><input type="number" placeholder='Bank Account Number'  /></span>

                            <span className={classes.shopName}><input type="text" placeholder='Bank Name' 
                            /></span>

                            <span className={classes.totalAmount}>₦<input type="text" readOnly defaultValue={totalAmount?.toLocaleString()} /></span> 
                            <Buttons text='Pay'  type='submit'/>
                        </form> 
                        

                    </li>
                    
                ))}
            </ul>
            ) : ( <NotFound  linkRoute='/admin/accounts' linkText='Go Back To Account'/>)
           }
        </div>
    );
}