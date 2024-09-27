import { sample_market_data } from "../data";

export const getAll = async () => sample_market_data

export const search = async searchTerm => sample_market_data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))