import { fetchWrapper } from 'src/helpers';

export const categoryService = {
    createCategory,
    changeCategory,
    deleteCategory
};

function createCategory(name) {
    return fetchWrapper.post(`${process.env.API_URL}/category`, { name })
}

function changeCategory(name, id) {
    return fetchWrapper.put(`${process.env.API_URL}/category/${id}`, { name, id })
}

function deleteCategory(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/category/${id}`)
}

