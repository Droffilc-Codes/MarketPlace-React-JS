import axios from "axios";

export const createOrder = async order =>{
    try{
        const {data} = await axios.post('/api/orders/create', order)
        return data 

    }catch(error){

    }
}

export const getNewOrderForCurrentUser = async () => {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser')
    console.log(data)
    return data
}

export const pay = async paymentId => {
    try{
        const {data} =  await axios.put('/api/orders/pay', { paymentId })
        return data
    }catch (error) {}
}



export const trackOrderById = async orderId =>{
    const { data } = await axios.get('/api/orders/track/' + orderId);
    return data;
}


export const getAllOrders = async status => {
    const { data } = await axios.get(`/api/orders/${status ?? ''}`)
    console.log(data)
    return data
}

export const getAllStatus = async () =>{
    const { data } = await axios.get('/api/orders/allStatus')
    return data
}

//My own backend access
export const changeOrderStatus = async orderId => {
    const { data } = await axios.put('/api/orders/delivery', {orderId})
    return data
}