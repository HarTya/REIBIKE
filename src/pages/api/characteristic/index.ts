import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from 'src/helpers/api';

export default apiHandler(handler);

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return createCharacteristic();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function createCharacteristic() {
        const { title, content, productId } = req.body;

        if (!title) throw 'Порожня назва';
        if (title.length > 25) throw 'Назва не більше ніж 25 символів';

        if (!content) throw 'Порожній опис';

        if(!productId) throw 'Оберіть товар';

        const result = await prisma.characteristic.create({
            data: {
                title,
                content,
                productId
            }
        });

        return res.status(200).json(result);
    }
}