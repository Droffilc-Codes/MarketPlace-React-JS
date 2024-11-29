import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../Services/orderService';
import classes from './accounts.module.css';
import Title from '../../Components/Title/Title';
import Search from '../../Components/Search/Search';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/Not Found/NotFound';
import { recordPayment } from '../../Services/accountService';

export default function ShopAccounts() {
  const [shopSales, setShopSales] = useState({});
  const { searchTerm } = useParams();

  const [theDate, setTheDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Set to yesterday's date
    today.setUTCHours(0, 0, 0, 0); // Normalize to start of day
    return today;
  });
  const [noData, setNoData] = useState(false);

  // Helper to normalize a given date
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setUTCHours(0, 0, 0, 0); // Reset to midnight
    return normalized;
  };

  const getSelectedDate = (date) => {
    if(!date){
      setNoData(true)
    }else{
      const normalizedDate = normalizeDate(date);
      setTheDate(normalizedDate);
    }
  };


  useEffect(() => {
    loadOrders();
  }, [searchTerm, theDate]);

  const loadOrders = async () => {
    const getOrders = await getAllOrders();
    calculateShopSales(getOrders);
  };

  const calculateShopSales = (orders) => {
    const sales = {};

    // Filter shipped orders
    const filterOrders = orders.filter((item) => item.status === 'SHIPPED');

    // Filter orders by selected date
    const secondFilter = filterOrders.filter((item) => {
      const orderDate = new Date(item.updatedAt);
      orderDate.setUTCHours(0, 0, 0, 0); // Normalize order date
      return orderDate.getTime() === theDate.getTime();
    });

    secondFilter.forEach((order) => {
      order.items.forEach((item) => {
        const shopName = item.grocery.shop;
        const totalAmount = item.price * 0.9;

        if (sales[shopName]) {
          sales[shopName] += totalAmount;
        } else {
          sales[shopName] = totalAmount;
        }
      });
    });

    sales.date = theDate.toISOString().split('T')[0]; // Format date as "YYYY-MM-DD"

    // Send payment data to backend
    const sendPay = async (sales) => {
      if (!sales || Object.keys(sales).length <= 1) {
        setNoData(true);
        console.log("EMPTY!")
      } else {
        setNoData(false);
        console.log("FULL")
        await recordPayment(sales);
      }
    };

    sendPay(sales);

    console.log('Sales Data:', sales);

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

      {
        noData && (
          <h3 className={classes.warning}>
            No Payment to Sellers on this Date!
          </h3>
        )
      }

      {shopSales ? (
        <ul className={classes.salesList}>
          {Object.entries(shopSales)
            .filter((item) => item[0] !== 'date')
            .map(([shopName, totalAmount]) => (
              <li key={shopName} className={classes.salesItem}>
                <form>
                  <span className={classes.shopName}>
                    <h3>{shopName}</h3>
                  </span>
                  <span className={classes.totalAmount}>
                    <h3>₦{totalAmount?.toLocaleString()}</h3>
                  </span>
                </form>
              </li>
            ))}
        </ul>
      ) : (
        <NotFound linkRoute="/admin/accounts" linkText="Go Back To Account" />
      )}
    </div>
  );
}
