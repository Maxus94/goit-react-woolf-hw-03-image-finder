const keyAPI = '40858721-2ab2962236a746e97c71283b6';
const baseURL = 'https://pixabay.com/api/';

export const getDataAPI = async (searchString) => {
    const data = await fetch(`${baseURL}?key=${keyAPI}&q=${searchString}&image_type=photo`);
    const res = await data.json();
    return res;  
};

// https://pixabay.com/api/?key=40858721-2ab2962236a746e97c71283b6&q=yellow+flowers&image_type=photo
