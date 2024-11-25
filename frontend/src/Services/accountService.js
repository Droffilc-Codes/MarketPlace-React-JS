import axios from "axios";

export const recordPayment = async (sales) =>{
    // console.log(shopName)
    // const data = await axios.post('/api/account/createPayment', {shopName, totalAmount, date})
    // return data 
    for (const [shopName, totalAmount] of Object.entries(sales)) {
        if (shopName === "date") continue; // Skip 'date' field
        await axios.post('api/account/createPayment', {
            shopName,
            totalAmount,
            date: sales.date,
        });
    }
    

}


export const shopPayments = async () => {

    const { data } = await axios.get(`/api/account/getPayments`)
    return data
}

export const updateShopPayments = async paymentID => {
    const { data } = await axios.put('/api/account/updateAccounts', {paymentID})
    return data
}