import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const PIXABY_API_KEY = `33270646-2a362df9d3e750eb74e58aa3c`;
    
export const getPicturesByName = async (name, page) => {
    const options = new URLSearchParams({
        q: name,
        per_page: 12,
        page: page,
        key: PIXABY_API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    })
    const {data} = await axios(`?${options}`);
    return data;
}