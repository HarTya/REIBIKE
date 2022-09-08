import { fetchWrapper } from 'src/helpers';

export const productService = {
    createProduct,
    changeProduct,
    deleteProduct
};

function createProduct(image, name, price, description, available, categoryId, subcategoryId, brandId) {
    return fetchWrapper.post(`${process.env.API_URL}/product`, { image, name, price, description, available, categoryId, subcategoryId, brandId })
}

function changeProduct(id, image, name, price, description, available, categoryId, subcategoryId, brandId) {
    return fetchWrapper.put(`${process.env.API_URL}/product/${id}`, { id, image, name, price, description, available, categoryId, subcategoryId, brandId })
}

function deleteProduct(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/product/${id}`)
}

