import { fetchWrapper } from 'src/helpers';

export const orderService = {
    orderLink,
    orderBasket
};

function orderLink(contact, link, comment) {
    return fetchWrapper.post(`${process.env.API_URL}/order/link`, { contact, link, comment })
}

function orderBasket(contact, price, content, comment) {
    return fetchWrapper.post(`${process.env.API_URL}/order/basket`, { contact, price, content, comment })
}