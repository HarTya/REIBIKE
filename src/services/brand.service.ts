import { fetchWrapper } from 'src/helpers';

export const brandService = {
    createBrand,
    changeBrand,
    deleteBrand
};

function createBrand(name) {
    return fetchWrapper.post(`${process.env.API_URL}/brand`, { name })
}

function changeBrand(name, id) {
    return fetchWrapper.put(`${process.env.API_URL}/brand/${id}`, { name, id })
}

function deleteBrand(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/brand/${id}`)
}