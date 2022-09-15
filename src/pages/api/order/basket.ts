import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return sendLetterBasket();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function sendLetterBasket() {
        const { contact, price, content } = req.body;
        let { comment } = req.body;

        if (!String(contact).trim()) throw 'Порожні контактні дані';
        if (String(contact).trim().length < 10) throw 'Довжина контактних даних не менше ніж 10 символів';

        const regex = /^(?:\+38)?(0\d{9})$/;
        if (!String(contact).includes('@gmail.com') && String(contact).search(regex) == -1) throw 'Недостовірні контактні дані';

        if (!String(content)) throw 'Порожнє замовлення';

        let contactText;

        if (String(contact).includes('@gmail.com')) {
            contactText = `✉ Контактные данные:`
        } else {
            contactText = `📟 Контактные данные:`
        }

        if (!String(comment).trim()) {
            comment = 'покупатель не добавил комментарий';
        }

        const result = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_GROUP_ID}&text=${contactText} ${String(contact).replace('+38', '').trim()} | 📋 Заказ на ${price} $: ${String(content).trim()} | 📃 Комментарий: ${String(comment).trim()}`);

        return res.status(200).json(result);
    }
}