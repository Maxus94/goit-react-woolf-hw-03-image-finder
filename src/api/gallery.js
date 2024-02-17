const keyAPI = '40858721-2ab2962236a746e97c71283b6';
const baseURL = 'https://pixabay.com/api/';

export const getDataAPI = async (searchString, page, perPage) => {
  const data = await fetch(
    `${baseURL}?key=${keyAPI}&q=${searchString}&image_type=photo&page=${page}&orientation=horizontal&per_page=${perPage}`
  );
  const res = await data.json();
  return res;
};
