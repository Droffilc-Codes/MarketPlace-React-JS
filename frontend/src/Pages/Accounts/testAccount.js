import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import classes from './accounts.module.css';
import Title from '../../Components/Title/Title';
import Search from '../../Components/Search/Search';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/Not Found/NotFound';
import { recordPayment } from '../../Services/accountService';

export default function ShopAccounts() {
  const [allOrders, setAllOrders] = useState([]);
  const [shopSales, setShopSales] = useState({});
  const { searchTerm } = useParams();
  const [theDate, setTheDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Set to yesterday's date
    return today;
  });
  const [noData, setNoData] = useState(false); // State for account data
  const [denyUpdate, setDenyUpdate] = useState(false)

  const getSelectedDate = (date) => {

    setTheDate(new Date(date))
    // // Ensure that only previous day's accounts are posted
    // const UpDate = new Date(date)
    // const today = new Date()
    // UpDate.setHours(1, 0, 0, 0)
    // today.setHours(1,0,0,0)

    //   if(UpDate.getTime() === today.getTime()){

    //     const previousDate = new Date(UpDate)
    //     previousDate.setDate(previousDate.getDate()-1)
    //     setTheDate(previousDate)
    //     setDenyUpdate(true)
    //   }else{
    //     setTheDate(UpDate);
    //     setDenyUpdate(false)
    //   }
  };
  console.log(theDate)

  
  useEffect(() => {

    loadOrders();

  }, [searchTerm, theDate, denyUpdate]);



  const loadOrders = async () => {
    const getOrders = await getAllOrders();
    setAllOrders(getOrders);
    calculateShopSales(getOrders);
  };
 
  const calculateShopSales = (orders) => {
    
        const sales = {};
      
            
        const filterOrders = orders.filter((item) => {
          const isShippedAndPayed = item.status === 'SHIPPED';
          return isShippedAndPayed; // Return all items that match the criteria
        });

        const month = theDate.getMonth();
        const selectedYear = theDate.getFullYear();
        const day = theDate.getDate();

        const secondTest = filterOrders.filter((item) => {
          const orderDate = new Date(item.updatedAt); // Will decide if it is shipped items or paid for
          const isCurrentMonth =
            orderDate.getMonth() === month &&
            orderDate.getFullYear() === selectedYear &&
            orderDate.getDate() === day;

          return isCurrentMonth; // Return all items that match the date
        });

        secondTest.forEach((order) => {
          order.items.forEach((item) => {
            const shopName = item.grocery.shop;
            const totalAmount = item.price * 0.9;

            if (sales[shopName]) {
              sales[shopName] += totalAmount;
            } else {
              sales[shopName] = totalAmount;
            }
            sales.date = theDate

          });
        });

      
        
        const sendPay = async (sales) => {
          if (!sales || Object.keys(sales || {}).length === 0 || denyUpdate){
            setNoData(true);
            
          } 
            else{
              setNoData(false);
              await recordPayment(sales);
            }
        }
        
        sendPay(sales)
        console.log(sales)


        if (searchTerm) {
          const getOneShop = Object.entries(sales).filter((shop) => {
            return shop[0].includes(searchTerm);
          });

          if (getOneShop.length === 0) {
            setShopSales(null);
          } else {
            const shopBalance = {};
            shopBalance[getOneShop[0][0]] = getOneShop[0][1];
            setShopSales(shopBalance);
          }
        } else {
        
            setShopSales(sales);
          
        }
  };

  return (
    <div className={classes.container}>
      <Title title="Daily Shop Accounts" />

      <Search
        placeholder="Search for Shops"
        searchRoute="/admin/accounts/"
        defaultRoute="/admin/accounts"
        margin="1rem 0"
      />

      <div>
        <input
          type="date"
          min="2000-01-01" // Example start date
          max={new Date(new Date().setDate(new Date().getDate() - 1))
            .toISOString()
            .split('T')[0]} // Disable today and future dates
          onChange={(e) => getSelectedDate(e.target.value)}
        />
      </div>

      
      {denyUpdate ? (

      <div className={classes.warning}>
        
        Business Day has not ended! Accounts of today will be updated tomorrow 
        
        <NotFound
                linkRoute="/admin/accounts"
                linkText="Go Back To Account"
        />
      </div>
      ) : (noData && <h3 className={classes.warning}>No Payment to Sellers on this Date!</h3> )
      
      }

      {shopSales ? (
        <ul className={classes.salesList}>
          {

          Object.entries(shopSales).filter(item => item[0] !== "date").map(([shopName, totalAmount]) => (
            <li key={shopName} className={classes.salesItem}>
              <form >

                    <span className={classes.shopName}>
                      <h3>
                        {shopName}
                      </h3>
                    </span>

                    <span className={classes.totalAmount}> 
                      <h3>
                           ₦{totalAmount?.toLocaleString()}
                      </h3> 
                    </span>
               
              </form>
            </li>
          ))}
        </ul> ) : (
                <NotFound
                linkRoute="/admin/accounts"
                linkText="Go Back To Account"
                />
            )}

      
    </div>
  );
}
