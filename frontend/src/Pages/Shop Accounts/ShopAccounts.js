import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import classes from './shopAccount.module.css'
import Title from '../../Components/Title/Title';
import Search from '../../Components/Search/Search';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/Not Found/NotFound';


export default function ShopAccounts() {
    const [allOrders, setAllOrders] = useState([]);
    const [shopSales, setShopSales] = useState({});
    const  { searchTerm } = useParams()
    

    useEffect(() => {
        loadOrders();
    }, [searchTerm]);

    const loadOrders = async () => {
        const getOrders = await getAllOrders();
        setAllOrders(getOrders);
        calculateShopSales(getOrders);
    };

    const calculateShopSales = (orders) => {
        const sales = {};
       
        //
        orders.forEach(order => {
            
            
            order.items.forEach(item => {
                const shopName = item.grocery.shop;
                const totalAmount = item.price;

                if (sales[shopName]) {
                    sales[shopName] += totalAmount;
                } else {
                    sales[shopName] = totalAmount;
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
                    const shopBalance = {}
                    shopBalance[getOneShop[0][0]] = getOneShop[0][1]
                    setShopSales(shopBalance)
                }
        }else{
            setShopSales(sales);
        }

    };
  

    return (
        <div className={classes.container}>
            <Title title="Shop Accounts"/>
            
            <Search 
                placeholder = "Search for Shops"
                searchRoute="/admin/shops/"
                defaultRoute = "/admin/shops"
                margin="1rem 0"
            
            />

           {
            shopSales ? (
                <ul className={classes.salesList}>
                {Object.entries(shopSales).map(([shopName, totalAmount]) => (
                    <li key={shopName} className={classes.salesItem}>
                        <span className={classes.shopName}>{shopName}</span>
                         <span className={classes.totalAmount}>₦{totalAmount?.toLocaleString()}</span> 
                    </li>
                ))}
            </ul>
            ) : ( <NotFound  linkRoute='/admin/shops' linkText='Go Back To Sellers Account'/>)
           }
        </div>
    );
}