import { fetchWrapper } from 'src/helpers';

export const characteristicService = {
    createCharacteristic,
    changeCharacteristic,
    deleteCharacteristic
};

function createCharacteristic(title, content, productId) {
    return fetchWrapper.post(`${process.env.API_URL}/characteristic`, { title, content, productId })
}

function changeCharacteristic(title, content, id) {
    return fetchWrapper.put(`${process.env.API_URL}/characteristic/${id}`, { title, content, id })
}

function deleteCharacteristic(id) {
    return fetchWrapper.delete(`${process.env.API_URL}/characteristic/${id}`)
}

