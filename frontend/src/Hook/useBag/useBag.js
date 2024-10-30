import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAll } from '../../Services/groceryServices'


const BagContext = createContext(null)

const BAG_KEY = 'bag'
const EMPTY_BAG = {
    items: [],
    totalPrice: 0,
    totalCount:0,
    stock: 0,
    delivery: 0,
    subTotal: 0
}

export default function BagProvider({children}) {
    const initBag = getBagFromLocalStorage()

    const [bagItems, setBagItems] = useState(initBag.items)
   
    const [totalPrice, setTotalPrice] = useState(initBag.totalPrice)
    const [totalCount, setTotalCount] = useState(initBag.totalCount)
    const [stock, setStock] = useState()
    const [delivery, setDelivery] = useState()
    const [subTotal, setSubTotal] = useState()
    


    useEffect(() => {
        // Calculate the total price from bag items
        const calculatedTotalPrice = sum(bagItems.map(item => item.price));
        const calculatedTotalCount = sum(bagItems.map(item => item.stock !== "out-Of-stock" ? item.quantity : 0));
        setTotalCount(calculatedTotalCount);
    
        let placeOne = 0;
        let placeTwo = 0;
        let longDistance = 5000;
        let withinDistance = 3000;
        let itemDeliveryLongDistance = 80
        let itemDeliverywithinDistance = 40
    
        // Determine if delivery spans two locations
        bagItems.forEach(item => {
            if (item.grocery.location === "Mainland") placeOne = 1;
            else if (item.grocery.location === "Island") placeTwo = 1;
        });
        
        const isLongDistance = placeOne && placeTwo;
    
        if (isLongDistance) {
            setDelivery(longDistance = longDistance + (calculatedTotalCount*itemDeliveryLongDistance));
            setSubTotal(calculatedTotalPrice)
            setTotalPrice(calculatedTotalPrice + longDistance ); 
        } else {
            setDelivery(withinDistance = withinDistance +  (calculatedTotalCount*itemDeliverywithinDistance));
            setSubTotal(calculatedTotalPrice)
            setTotalPrice(calculatedTotalPrice + withinDistance );
        }
    
    
        // Fetch stock data and update
        getAll().then(groceryItems => setStock(groceryItems.stock));
    
        localStorage.setItem(BAG_KEY, JSON.stringify({
            items: bagItems,
            totalPrice: calculatedTotalPrice,
            totalCount: calculatedTotalCount,
            stock,
            delivery,
            subTotal,
        }));
    }, [bagItems, stock]);
    


    function getBagFromLocalStorage(){
        const storedBag = localStorage.getItem(BAG_KEY)

        return storedBag? JSON.parse(storedBag) : EMPTY_BAG
    }

    const sum = anyItem => {
        return anyItem.reduce((prevValue, curValue)=> prevValue + curValue, 0)
    }

    const removeFromBag = groceryId => {
        const filteredBagItems = bagItems.filter(item => item.grocery.id !== groceryId)
        setBagItems(filteredBagItems)
    }

    // Checks changing Quantity 
    const changedQuantity = (bagItem, newQuantity) =>{
        const { grocery } = bagItem

        const checkStock = ()=>{
                const currenStock = grocery.stock - newQuantity 
                setStock(currenStock)
                return currenStock >= 0 ? currenStock : "out-Of-stock"
            }

        const checkPrice = () => {
            const thePrice = grocery.price * newQuantity
            return checkStock() === "out-Of-stock"? grocery.price * grocery.stock : thePrice
        }

        if (checkStock() === "out-Of-stock") {
            return; // Don't allow further updates if the item is out of stock
        }

        const changeBagItem = {
            ...bagItem, //bagItems
            quantity: newQuantity,
            price: checkPrice(),
            stock: checkStock()
        }

        setBagItems(
            bagItems.map(item => (item.grocery.id === grocery.id ? changeBagItem : item))
        )
    }


    const addToBag = grocery => {
        const bagItem = bagItems.find(item => item.grocery.id === grocery.id)
        if(bagItem){
            changedQuantity(bagItem, bagItem.quantity + 1)
        }else{
            setBagItems([...bagItems, {grocery, quantity:1, price:grocery.price}])
        }
    }

    const clearBag = ()=>{
        localStorage.removeItem(BAG_KEY)
        const { items, totalPrice, totalCount } = EMPTY_BAG
        setBagItems(items)
        setTotalPrice(totalPrice)
        setTotalCount(totalCount)
    }

// Reduce Item inStock - should be done

  return <BagContext.Provider value={{bag:{items:bagItems, totalPrice, totalCount, stock, delivery, subTotal}, removeFromBag, changedQuantity, addToBag, clearBag}}>
    {children}
    </BagContext.Provider>
}


export const useBag = () => useContext(BagContext)