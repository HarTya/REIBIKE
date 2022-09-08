import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return sendLetterLink();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function sendLetterLink() {
        const { contact, link } = req.body;
        let { comment } = req.body;

        if (!String(contact).trim()) throw 'Порожні контактні дані';
        if (String(contact).trim().length < 9) throw 'Довжина контактних даних не менше ніж 9 символів';
        if (!String(contact).includes('@gmail.com') && !String(contact).includes('0')) throw 'Недостовірні контактні дані';

        if (!String(link)) throw 'Порожнє посилання';
        if (!String(link).includes('https://') && !String(link).includes('http://')) throw 'Недостовірне посилання';

        let contactText;

        if (String(contact).includes('@gmail.com')) {
            contactText = `✉ Контактные данные:`
        } else {
            contactText = `📟 Контактные данные:`
        }

        if (!String(comment).trim()) {
            comment = 'покупатель не добавил комментарий';
        }

        const result = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_GROUP_ID}&text=${contactText} ${String(contact).trim()} | 🔗 Ссылка: ${String(link).trim()} | 📃 Комментарий: ${String(comment).trim()}`);

        return res.status(200).json(result);
    }
}