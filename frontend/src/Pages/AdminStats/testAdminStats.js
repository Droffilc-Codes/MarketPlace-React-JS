// Sellers payment
// Delivered or shipping area

import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import classes from './shopAccount.module.css'
import Title from '../../Components/Title/Title';
import Search from '../../Components/Search/Search';
import { useParams } from 'react-router-dom';

export default function ShopAccounts() {
    const [allOrders, setAllOrders] = useState([]);
    const [shopSales, setShopSales] = useState({});
    const { searchTerm } = useParams()
    

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const getOrders = await getAllOrders();
        setAllOrders(getOrders);
        calculateShopSales(getOrders);
    };

    const calculateShopSales = (orders) => {
        const sales = {};
        //TEST
        const edey = false
        //    const getSomeOrder = 
       orders.forEach(order => {
            // Filter items belonging to the specified shop
            if(edey){
                const filteredItems = order.items.filter(item => {
                    const shopName = item.grocery.shop;
                    return shopName === "Mummy Israel";
                });
                console.log(filteredItems);
            }else{
                console.log("Do the next thing!!")
            }
        
            // Log or process the filtered items as needed
            
        });
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

        setShopSales(sales);
    };

    return (
        <div className={classes.container}>
            <Title title="Shop Accounts"/>
            <Search 
                        searchRoute='/admin/shops/'
                        defaultRoute='/admin/shops'
                        margin="1rem 0"
                        placeholder='Search for Seller'
            />

            <ul>
                {Object.entries(shopSales).map(([shopName, totalAmount]) => (
                    <li key={shopName}>
                        {shopName}: ₦{totalAmount?.toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}