import React, { createContext, useContext, useEffect, useState } from 'react'
// import { sample_market_data } from '../../../../backend/src/data'
import { getAll } from '../../Services/groceryServices'


const BagContext = createContext(null)

const BAG_KEY = 'bag'
const EMPTY_BAG = {
    items: [],
    totalPrice: 0,
    totalCount:0,
    //
    stock: 0
}

export default function BagProvider({children}) {
    const initBag = getBagFromLocalStorage()

    const [bagItems, setBagItems] = useState(initBag.items)
   
    const [totalPrice, setTotalPrice] = useState(initBag.totalPrice)
    const [totalCount, setTotalCount] = useState(initBag.totalCount)
    const [stock, setStock] = useState()


    useEffect(()=>{
        const totalPrice = sum(bagItems.map(item => item.price))
        const totalCount = sum(bagItems.map(item =>(item.stock !== "out-Of-stock"? item.quantity: 0)))
        
        setTotalPrice(totalPrice)
        setTotalCount(totalCount)

        //Try
        getAll().then(groceryItem => setStock(groceryItem.stock))
        //end Try


        localStorage.setItem(BAG_KEY, JSON.stringify({items:bagItems, totalPrice, totalCount, stock /* reove stock*/}))

    }, [bagItems, stock])


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

  return <BagContext.Provider value={{bag:{items:bagItems, totalPrice, totalCount, stock}, removeFromBag, changedQuantity, addToBag, clearBag}}>
    {children}
    </BagContext.Provider>
}


export const useBag = () => useContext(BagContext)