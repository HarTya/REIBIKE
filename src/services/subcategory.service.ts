import { fetchWrapper } from 'src/helpers';

export const subcategoryService = {
    createSubcategory,
    changeSubcategory,
    deleteSubcategory
};

function createSubcategory(name, categoryId) {
    return fetchWrapper.post(`${process.env.API_URL}/subcategory`, { name, categoryId })
}

function changeSubcategory(name, id) {
    return fetchWrapper.put(`${process.env.API_URL}/subcategory/${id}`, { name, id })
}

function deleteSubcategory(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/subcategory/${id}`)
}

