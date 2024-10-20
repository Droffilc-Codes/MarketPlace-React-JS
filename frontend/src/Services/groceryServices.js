import axios from 'axios'

export const getAll = async () => {
    const { data } = await axios.get('/api/groceries') //check this later for the link address
    return data
}

export const search = async searchTerm => {
    const { data } = await axios.get('api/groceries/search/' + searchTerm)
    return data
}

export const getAllTags = async () => {
    const { data } = await axios.get('api/groceries/tags')
     return data
}

export const getAllGroceriesByTag = async tags => {
    if(tags === 'grocery') getAll()
        const { data } = await axios.get('api/groceries/tags/' + tags)
        return data
    }

export const getGroceryById = async groceryId => {
    const { data } = await axios.get('api/groceries/' + groceryId)
    return data
}

// Test Oct 17
export const stockUpdateResponse  = async orders => {
    try {
        // const { data } = await axios.put('/api/groceries/changestock', { items: orders })
        const { data } = await axios.put('/api/groceries/changestock', orders )
        return data;
    } catch (error) {
        console.error("Error updating stock:", error);
        throw error;
    }
};