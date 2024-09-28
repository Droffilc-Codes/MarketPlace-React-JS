import { sample_market_data, sample_market_tags } from "../data";

export const getAll = async () => sample_market_data

export const search = async searchTerm => sample_market_data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

export const getAllTags = async () => sample_market_tags

export const getAllGroceriesByTag = async tags => {
    if(tags === 'grocery') getAll()
        return sample_market_data.filter(items => items.tags?.includes(tags))
    }

export const getGroceryById = async groceryId => sample_market_data.find(item => item.id === groceryId)